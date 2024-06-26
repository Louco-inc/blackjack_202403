import { useState, useEffect } from "react";
import Header from "../../components/header";
import TopComponent from "../naoya/phase/top";
import GameComponent from "./phase/game";
import {
  getUUIDFromSessionStorage,
  saveUUIDToSessionStorage,
} from "../../lib/SessionStorage";
import InputForm from "../../components/InputForm";
import { InputStateType, PlayerType } from "../../types";
import GameRuleModal from "@/components/GameRuleModal";

export default function BlackJackPage(): JSX.Element {
  const [phase, setPhase] = useState<number>(0); // 初期値は0
  const [prevPhase, setPrevPhase] = useState<number>(0);
  const [playerData, setPlayerData] = useState<PlayerType>({
    id: -100,
    nickname: "",
    uuid: "",
    point: -100,
  });
  const [bettingPoint, setBettingPoint] = useState<number>(0); // 初期値は0
  const [showGameRuleModal, setGameRuleModal] = useState<boolean>(false);

  useEffect(() => {
    const init = async (): Promise<void> => {
      const uuid: string = getUUIDFromSessionStorage() ?? "";
      console.log(uuid);
      if (uuid) {
        const headers = new Headers();
        headers.append("Authorization", uuid);
        const res: PlayerType = await fetch("/api/player", {
          method: "GET",
          headers,
        }).then(async (r) => await r.json());
        setPlayerData(res);
        const recentUuid: string = res.uuid;
        saveUUIDToSessionStorage(recentUuid);
      }
    };
    init();
  }, []);

  const switchPage = async (type: string): Promise<void> => {
    switch (type) {
      case "top-next": {
        // uuidがあればプレイヤーを取得してskip uuidがなければnickname画面へ
        if (playerData.uuid) {
          skipPage(2);
        } else {
          goNext();
        }
        break;
      }
      case "nickname-next": {
        goNext();
        break;
      }
      case "betting-next": {
        goNext();
        break;
      }
    }
  };

  const skipPage = (num: number): void => {
    setPhase(num);
  };

  const goNext = (): void => {
    setPhase((prev) => prev + 1);
    setPrevPhase((prev) => prev + 1);
  };

  const goBack = (): void => {
    setPhase(prevPhase);
    if (prevPhase > 0) {
      setPrevPhase((prev) => prev - 1);
    }
  };

  const validateNickName = (value: InputStateType): boolean => {
    if (typeof value !== "string") {
      return false;
    }
    return value.length > 0 && value.length < 20;
  };

  const validateBettingValue = (value: InputStateType): boolean => {
    if (typeof value !== "number") {
      return false;
    }
    return value >= 100 && playerData.point >= value;
  };

  const confirmNickName = async (value: InputStateType): Promise<void> => {
    if (typeof value !== "string") {
      return;
    }
    const params = { nickname: value };
    const res: PlayerType = await fetch("/api/player", {
      method: "POST",
      body: JSON.stringify(params),
    }).then(async (r) => await r.json());
    setPlayerData(res);
    const recentUuid: string = res.uuid;
    saveUUIDToSessionStorage(recentUuid);
    await switchPage("nickname-next");
  };

  const confirmBettingValue = async (value: InputStateType): Promise<void> => {
    if (typeof value !== "number") {
      return;
    }
    setBettingPoint(value);
    setPlayerData((prev) => ({
      ...playerData,
      point: prev.point - value,
    }));
    await switchPage("betting-next");
  };

  const betDoublePoint = (): void => {
    setBettingPoint((prev) => prev * 2);
  };

  const openTop = (): void => {
    setPhase(0);
    setPrevPhase(0);
  };
  const onRetry = (): void => {
    setPhase(2);
    setPrevPhase(0);
  };

  return (
    <>
      <Header />
      <div className={`h-[calc(100vh-48px)] bg-main-color text-white px-8`}>
        {phase === 0 ? (
          <TopComponent
            playerPoint={playerData.point}
            onStart={async () => await switchPage("top-next")}
            openHowToPlay={() => setGameRuleModal(true)}
            openHistory={() => alert("戦歴画面を開く")}
          />
        ) : (
          <></>
        )}
        {phase === 1 ? (
          <InputForm
            label="ニックネーム"
            errorMessage="ニックネームは1文字以上20文字以下で入力してください"
            inputType="string"
            confirmButtonLabel="次へ"
            validate={(value) => validateNickName(value)}
            confirm={async (val) => await confirmNickName(val)}
            goBack={goBack}
          />
        ) : (
          <></>
        )}
        {phase === 2 ? (
          <InputForm
            label="ベット数"
            errorMessage="ベット数は100以上の数字を入力してください"
            confirmButtonLabel="確定"
            inputType="number"
            validate={(value) => validateBettingValue(value)}
            confirm={async (val) => await confirmBettingValue(val)}
            goBack={goBack}
          />
        ) : (
          <></>
        )}
        {phase === 3 ? (
          <GameComponent
            playerData={playerData}
            bettingPoint={bettingPoint}
            betDoublePoint={betDoublePoint}
            openTop={openTop}
            onRetry={onRetry}
            onFinishedGame={(newPoint: number) =>
              setPlayerData((prev) => ({
                ...prev,
                point: newPoint,
              }))
            }
          />
        ) : (
          <></>
        )}
      </div>
      <GameRuleModal
        showGameRuleModal={showGameRuleModal}
        closeGameRuleModal={() => setGameRuleModal(false)}
      />
    </>
  );
}
