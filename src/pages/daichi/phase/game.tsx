import { useState, useEffect } from "react";
import { CardType } from "@/types";
import { PlayerType } from "@/types";
import { Button } from "@chakra-ui/react";
import Image from "next/image";
import { useCardDeck } from "@/hooks/useCardDeck";

type PropsType = {
  playerData: PlayerType;
  bettingPoint: number;
  betDoublePoint: () => void;
  openTop: () => void;
  onRetry: () => void;
  onFinishedGame: (point: number) => void;
};

export default function GameComponent(props: PropsType): JSX.Element {
  useEffect(() => {
    const init = (): void => {
      const cardDeck = useCardDeck();
      console.log(cardDeck);
    };
    init();
  });

  //hitの関数作成
  //doubleの関数作成
  //standの関数作成
  //surrenderの関数作成

  return (
    <>
      <div></div>
      <div className="flex justify-center">
        <Button
          className="mr-8"
          color="FFFFFF"
          variant="outline"
          fontSize="16"
          fontWeight="bold"
        >
          ヒット
        </Button>
        <Button
          className="mr-8"
          color="FFFFFF"
          variant="outline"
          fontSize="16"
          fontWeight="bold"
        >
          ダブル
        </Button>
        <Button
          className="mr-8"
          color="FFFFFF"
          variant="outline"
          fontSize="16"
          fontWeight="bold"
        >
          スタンド
        </Button>
        <Button
          className="mr-8"
          color="FFFFFF"
          variant="outline"
          fontSize="16"
          fontWeight="bold"
        >
          サレンダー
        </Button>
      </div>
    </>
  );
}
