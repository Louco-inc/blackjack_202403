// TOP
// ニックネーム
// ベット
// ゲーム
// リザルト
// 履歴

import { useState } from "react";
import Header from "../../components/header";
import TopComponent from "./phase/top";
import GameComponent from "./phase/game";
import {
  getUUIDFromSessionStorage,
  saveUUIDToSessionStorage,
} from "../../lib/SessionStorage";
import InputForm from "../../components/InputForm";
import { InputStateType } from "../../types";

type PlayerType = {
  nickname: string;
  uuid: string;
  point: number;
};

export default function BlackJackPage(): JSX.Element {
  const [phase, setPhase] = useState<number>(0);
  const [prevPhase, setPrevPhase] = useState<number>(0);
  const [playerData, setPlayerData] = useState<PlayerType>({
    nickname: "",
    uuid: "",
    point: 0,
  });

  const openHowToPlay = (): void => {};
  const openHistory = (): void => {};

  const switchPage = async (type: string): Promise<void> => {
    switch (type) {
      case "top-next": {
        // ニックネーム画面に飛ばすかベット画面に飛ばすか
        const uuid: string = getUUIDFromSessionStorage() ?? "";
        console.log(uuid);
        // uuidがあればプレイヤーを取得してskip
        if (uuid) {
          const headers = new Headers();
          headers.append("Authorization", uuid);
          const res: PlayerType = await fetch("/api/player", {
            method: "GET",
            headers,
          }).then(async (r) => await r.json());

          // プレイヤーデータをstateに保持
          setPlayerData(res);

          // セッションストレージに保持
          const recentUuid: string = res.uuid;
          saveUUIDToSessionStorage(recentUuid);

          // ベット画面へ
          skipPage(2);
        } else {
          // uuidがなければnickname画面へ
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
      case "game-next": {
        goNext();
        break;
      }
      case "result": {
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

  const confirmNickName = async (value: InputStateType): Promise<void> => {
    if (typeof value !== "string") {
      return;
    }
    await switchPage("nickname-next");
  };

  const confirmBettingValue = async (value: InputStateType): Promise<void> => {
    if (typeof value !== "number") {
      return;
    }
    await switchPage("betting-next");
  };

  return (
    <>
      <Header />
      <div className="h-screen bg-main-color text-white px-8">
        {phase === 0 ? (
          <TopComponent
            onStart={async () => await switchPage("top-next")}
            openHowToPlay={openHowToPlay}
            openHistory={openHistory}
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
            confirm={async (val) => await confirmBettingValue(val)}
            goBack={goBack}
          />
        ) : (
          <></>
        )}
        {phase === 3 ? <GameComponent /> : <></>}
      </div>
    </>
  );
}
