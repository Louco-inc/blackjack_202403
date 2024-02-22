// TOP
// ニックネーム
// ベット
// ゲーム
// リザルト
// 履歴

import { useState } from "react";
import Header from "../components/header";
import TopComponent from "./top";

export default function BlackJackPage(): JSX.Element {
  const [phase, setPhase] = useState<number>(0);
  const [prevPhase, setPrevPhase] = useState<number>(0);

  const handleStart = (): void => {
    // ニックネーム画面に飛ばすかベット画面に飛ばすか
  };

  const openHowToPlay = (): void => {};
  const openHistory = (): void => {};


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
      </div>
    </>
  );
}
