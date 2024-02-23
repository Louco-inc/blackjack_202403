// TOP
// ニックネーム
// ベット
// ゲーム
// リザルト
// 履歴

import { useState } from "react";
import Header from "../components/header";
import TopComponent from "./phase/top";
import NickNameComponent from "./phase/nickname";
import BettingComponent from "./phase/betting";
import GameComponent from "./phase/game";
import {
  getUUIDFromSessionStorage,
  saveUUIDToSessionStorage,
} from "../../lib/SessionStorage";

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
          <NickNameComponent
            goNext={async () => await switchPage("nickname-next")}
            goBack={goBack}
          />
        ) : (
          <></>
        )}
        {phase === 2 ? (
          <BettingComponent
            goNext={async () => await switchPage("betting-next")}
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
