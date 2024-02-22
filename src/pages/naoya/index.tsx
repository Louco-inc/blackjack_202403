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

export default function BlackJackPage(): JSX.Element {
  const [phase, setPhase] = useState<number>(0);
  const [prevPhase, setPrevPhase] = useState<number>(0);

  const handleStart = (): void => {
    // ニックネーム画面に飛ばすかベット画面に飛ばすか
  };

  const openHowToPlay = (): void => {};
  const openHistory = (): void => {};

  const switchPage = (type: string): void => {};

  const goBack = (): void => {
    setPhase((prev) => prev - 1);
    setPrevPhase((prev) => prev - 1);
  };

  return (
    <>
      <Header />
      <div className="h-screen bg-main-color text-white px-8">
        {phase === 0 ? (
          <TopComponent
            onStart={handleStart}
            openHowToPlay={openHowToPlay}
            openHistory={openHistory}
          />
        ) : (
          <></>
        )}
        {phase === 1 ? (
          <NickNameComponent
            goNext={() => switchPage("betting")}
            goBack={goBack}
          />
        ) : (
          <></>
        )}
				{phase === 2 ? (
          <BettingComponent
            goNext={() => switchPage("betting")}
            goBack={goBack}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
