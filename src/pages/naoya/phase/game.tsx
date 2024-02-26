import { useEffect, useState } from "react";
import { CardType, PlayerType, ResultType } from "../../../types";
import { useCardDeck, pick } from "@/hooks/useCardDeck";
import { Button, Text } from "@chakra-ui/react";
import Image from "next/image";
import ResultModal from "./ResultModal";
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
  const [showResult, setShowResult] = useState<boolean>(false);
  const [result, setResult] = useState<ResultType>("win");
  const [resultPoint, setResultPoint] = useState<number>(0);
  const [playerResultPoint, setPlayerResultPoint] = useState<number>(0);
  const [dealerResultPoint, setDealerResultPoint] = useState<number>(0);

  useEffect(() => {
    const init = (): void => {
      const cardDeck = useCardDeck();
      setCardDeck(cardDeck);
      const playerCard1 = pick(cardDeck, setCardDeck);
      const playerCard2 = pick(cardDeck, setCardDeck);
      setPlayerHands([playerCard1, playerCard2]);
      const dealerCard1 = pick(cardDeck, setCardDeck);
      const dealerCard2 = pick(cardDeck, setCardDeck);
      setDealerHands([dealerCard1, dealerCard2]);

      const playerResult: number = cardNumberSum(playerHands);
      const dealerResult: number = cardNumberSum(dealerHands);
      if (playerResult === 21) {
        setPlayerResultPoint(playerResult);
        setDealerResultPoint(dealerResult);
        if (dealerResult === 21) {
          finishGameHandler("draw");
        } else {
          finishGameHandler("win");
        }
      }
    };
    init();
  }, []);

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
  const double = (): void => {
    betDoublePoint();
    hit("player");
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

  const stand = (): void => {
    const playerResult: number = cardNumberSum(playerHands);
    setPlayerResultPoint(playerResult);
    const dealerResult = calcDealerPoint(dealerHands);
    setDealerResultPoint(dealerResult);
    if (dealerResult >= 22) {
      finishGameHandler("win");
      return;
    }
    if (playerResult === dealerResult) {
      finishGameHandler("draw");
    } else if (playerResult > dealerResult) {
      finishGameHandler("win");
    } else {
      finishGameHandler("lose");
    }
  };
  const surrender = (): void => {
    const playerResult: number = cardNumberSum(playerHands);
    setPlayerResultPoint(playerResult);
    const dealerResult = cardNumberSum(dealerHands);
    setDealerResultPoint(dealerResult);
    finishGameHandler("lose");
  };

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

  const handleOpenTop = (): void => {
    setShowResult(false);
    openTop();
  };
  const handleRetry = (): void => {
    setShowResult(false);
    onRetry();
  };

  return (
    <>
      <div className="h-full relative">
        <div className="absolute right-0 top-0">
          <div className="text-end">ポイント数: {playerData.point}P</div>
          <div className="text-end">Bet: {bettingPoint}P</div>
        </div>
        <div>
          <div className="pt-4 flex justify-center">
            <Text
              className="font-bold text-center h-10 w-10 leading-10 bg-white rounded-lg"
              fontSize="2xl"
              color="mainColor"
            >
              {cardNumberSum(dealerHands)}
            </Text>
            <Text className="self-end whitespace-nowrap mr-4">ディーラー</Text>
            <div className="relative h-60 w-1/2">
              {dealerHands.map((hand, i) => {
                const leftPosition = `${24 * i}px`;
                return (
                  <div
                    key={hand.imageId}
                    style={{ left: leftPosition }} // tailwindでは動的な値が指定できずやむなくインラインで適用
                    className={"absolute" + ` z-${i + 1}0`}
                  >
                    {showResult ? (
                      <Image
                        src={`/images/${hand.imageId}.png`}
                        alt="トランプの画像"
                        width={160}
                        height={240}
                      />
                    ) : (
                      <Image
                        src={`/images/back-of-card.png`}
                        alt="トランプの画像"
                        width={160}
                        height={240}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="my-10 flex justify-center">
            <Text
              className="font-bold text-center h-10 w-10 leading-10 bg-white rounded-lg"
              fontSize="2xl"
              color="mainColor"
            >
              {cardNumberSum(playerHands)}
            </Text>
            <Text className="self-end whitespace-nowrap mr-4">
              {playerData.nickname}
            </Text>
            <div className="relative h-60 w-1/2">
              {playerHands.map((hand, i) => {
                const leftPosition = `${24 * i}px`;
                const zIndex = `z-${i * 10}`;
                return (
                  <div
                    key={hand.imageId}
                    style={{ left: leftPosition }} // tailwindでは動的な値が指定できずやむなくインラインで適用
                    className={`absolute ${zIndex}`}
                  >
                    <Image
                      src={`/images/${hand.imageId}.png`}
                      alt="トランプの画像"
                      width={160}
                      height={240}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mb-8 flex justify-center">
          <Button
            className="mr-8"
            color="#ffffff"
            size="lg"
            variant="outline"
            onClick={() => hit("player")}
          >
            ヒット
          </Button>
          <Button
            className="mr-8"
            color="#ffffff"
            size="lg"
            variant="outline"
            onClick={double}
          >
            ダブル
          </Button>
          <Button
            className="mr-8"
            color="#ffffff"
            size="lg"
            variant="outline"
            onClick={stand}
          >
            スタンド
          </Button>
          <Button
            className="mr-8"
            color="#ffffff"
            size="lg"
            variant="outline"
            onClick={surrender}
          >
            サレンダー
          </Button>
        </div>
      </div>
      <ResultModal
        showModal={showResult}
        result={result}
        bettingPoint={bettingPoint}
        resultPoint={resultPoint}
        playerData={playerData}
        playerHands={playerHands}
        dealerHands={dealerHands}
        playerResultPoint={playerResultPoint}
        dealerResultPoint={dealerResultPoint}
        openTop={handleOpenTop}
        onRetry={handleRetry}
      />
    </>
  );
}
