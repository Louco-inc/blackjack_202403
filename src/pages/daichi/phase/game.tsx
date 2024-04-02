import { useState, useEffect } from "react";
import { CardType } from "@/types";
import { PlayerType, ResultType } from "@/types";
import { useCardDeck, pick } from "@/hooks/useCardDeck";
import { Button } from "@chakra-ui/react";
import Image from "next/image";
import { getUUIDFromSessionStorage } from "@/lib/SessionStorage";

type PropsType = {
  playerData: PlayerType;
  bettingPoint: number;
  betDoublePoint: () => void;
  openTop: () => void;
  onRetry: () => void;
  onFinishedGame: (point: number) => void;
};

export default function GameComponent(props: PropsType): JSX.Element {
  const {
    playerData,
    bettingPoint,
    betDoublePoint,
    openTop,
    onRetry,
    onFinishedGame,
  } = props;
  const [cardDeck, setCardDeck] = useState<CardType[]>([]);
  const [playerHands, setPlayerHands] = useState<CardType[]>([]);
  const [dealerHands, setDealerHands] = useState<CardType[]>([]);
  const [resultPoint, setResultPoint] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [result, setResult] = useState<ResultType>("win");
  const [playerResultPoint, setPlayerResultPoint] = useState<number>(0);
  const [dealerResultPoint, setDealerResultPoint] = useState<number>(0);

  useEffect(() => {
    const init = (): void => {
      const cardDeck = useCardDeck();
      console.log(cardDeck);
    };
    init();
  });

  const cardNumberSum = (cards: CardType[]): number => {
    // TODO: Aを1or11に変換する処理を入れる
    return cards
      .map((card) => Number(card.rank))
      .reduce((total, num) => {
        if (num > 10) {
          return total + 10;
        }
        return total + num;
      }, 0);
  };

  const saveGameHistory = async (
    finishedPoint: number,
    currentPoint: number,
    result: ResultType
  ): Promise<void> => {
    const uuid: string = getUUIDFromSessionStorage() ?? "";
    const headers = new Headers();
    headers.append("Authorization", uuid);
    const [increasePoint, decreasePoint] =
      finishedPoint > 0 ? [finishedPoint, 0] : [0, bettingPoint];
    const params = {
      matchDay: new Date(),
      result,
      increasePoint,
      decreasePoint,
      currentPoint,
      playerHands,
      dealerHands,
    };
    await fetch("/api/history", {
      method: "POST",
      body: JSON.stringify(params),
      headers,
    });
  };

  const calcDealerPoint = (dealerHands: CardType[]): number => {
    let dealerResult = cardNumberSum(dealerHands);
    if (dealerResult < 17) {
      while (dealerResult < 17) {
        const newCard = pick(cardDeck, setCardDeck);
        setDealerHands((prev) => prev.concat([newCard]));
        dealerResult += cardNumberSum([newCard]);
      }
    }
    return dealerResult;
  };

  const updatedPlayerPoint = async (
    currentPoint: number,
    id: number
  ): Promise<void> => {
    const params = {
      id,
      currentPoint,
    };
    await fetch(`/api/player/${id}`, {
      method: "PUT",
      body: JSON.stringify(params),
    });
  };

  const finishGameHandler = (result: ResultType): void => {
    const calculatePoint = calcResultPoint(result);
    setResultPoint(calculatePoint);
    const finishedPoint = result === "lose" ? -calculatePoint : calculatePoint;
    const currentPoint = playerData.point + finishedPoint;
    onFinishedGame(currentPoint);
    setResult(result);
    setShowResult(true);
    saveGameHistory(finishedPoint, currentPoint, result);
    updatedPlayerPoint(currentPoint, playerData.id);
  };

  const calcResultPoint = (result: ResultType): number => {
    // 初手で21になった場合は3倍する
    switch (result) {
      case "win":
        return bettingPoint * 2;
      case "draw":
        return bettingPoint;
      case "lose":
        return 0;
    }
  };

  const hit = (user: "player" | "dealer"): void => {
    const newCard = pick(cardDeck, setCardDeck);
    if (user === "player") {
      const afterPoint =
        cardNumberSum([...playerHands]) + cardNumberSum([newCard]);
      setPlayerHands((prev) => prev.concat([newCard]));
      if (afterPoint > 21) {
        // 21以上の場合はバースト
        setPlayerResultPoint(afterPoint);
        const dealerResult = calcDealerPoint(dealerHands);
        setDealerResultPoint(dealerResult);
        finishGameHandler("lose");
      }
    } else {
      setDealerHands((prev) => prev.concat([newCard]));
    }
  };
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
