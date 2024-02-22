// TOP
// ニックネーム
// ベット
// ゲーム
// リザルト
// 履歴

import { useState } from "react";
import Header from "../components/header";
import TopComponent from "./top";
import NickNameComponent from "./nickname";
import BettingComponent from "./betting";

export default function BlackJackPage(): JSX.Element {
  const [phase, setPhase] = useState<number>(0);
  const [prevPhase, setPrevPhase] = useState<number>(0);

  const openHowToPlay = (): void => {};
  const openHistory = (): void => {};

  const switchPage = (type: string): void => {
    switch (type) {
      case "top-next": {
        // ニックネーム画面に飛ばすかベット画面に飛ばすか
        goNext();
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

  const goNext = (): void => {
    setPhase((prev) => prev + 1);
    setPrevPhase((prev) => prev + 1);
  };

  const goBack = (): void => {
    setPhase((prev) => prev - 1);
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
            onStart={() => switchPage("top-next")}
            openHowToPlay={openHowToPlay}
            openHistory={openHistory}
          />
        ) : (
          <></>
        )}
        {phase === 1 ? (
          <NickNameComponent
            goNext={() => switchPage("nickname-next")}
            goBack={goBack}
          />
        ) : (
          <></>
        )}
        {phase === 2 ? (
          <BettingComponent
            goNext={() => switchPage("betting-next")}
            goBack={goBack}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
