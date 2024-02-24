import { useEffect, useState } from "react";
import { CardType, PlayerType, ResultType } from "../../../types";
import { useCardDeck, pick } from "@/hooks/useCardDeck";
import { Button, Text } from "@chakra-ui/react";
import Image from "next/image";
import ResultDialog from "./ResultModal";

type PropsType = {
  playerData: PlayerType;
  bettingPoint: number;
  betDoublePoint: () => void;
  openTop: () => void;
  onRetry: () => void;
};

export default function GameComponent(props: PropsType): JSX.Element {
  const { playerData, bettingPoint, betDoublePoint, openTop, onRetry } = props;
  const [cardDeck, setCardDeck] = useState<CardType[]>([]);
  const [playerHands, setPlayerHands] = useState<CardType[]>([]);
  const [dealerHands, setDealerHands] = useState<CardType[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [result, setResult] = useState<ResultType>("win");

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
    };
    init();
  }, []);

  const hit = (user: "player" | "dealer"): void => {
    const newCard = pick(cardDeck, setCardDeck);
    if (user === "player") {
      const afterCount = cardNumberSum([...playerHands]) + Number(newCard.rank);
      setPlayerHands((prev) => prev.concat([newCard]));
      if (afterCount > 21) {
        // 21以上の場合はバースト standを呼び出す
        stand();
      }
    } else {
      setDealerHands((prev) => prev.concat([newCard]));
    }
  };
  const double = (): void => {
    betDoublePoint();
  };
  const stand = (): void => {
    const playerResult = cardNumberSum(playerHands);
    // プレイヤーのポイントが22以上
    if (playerResult >= 22) {
      setResult("lose");
      setShowResult(true);
      return;
    }
    let dealerResult = cardNumberSum(dealerHands);
    if (dealerResult < 17) {
      while (dealerResult < 17) {
        const newCard = pick(cardDeck, setCardDeck);
        dealerResult += Number(newCard.rank);
      }
    }
    if (dealerResult >= 22) {
      setResult("win");
      setShowResult(true);
      return;
    }
    if (playerResult === dealerResult) {
      setResult("draw");
    } else if (playerResult > dealerResult) {
      setResult("win");
    } else {
      setResult("lose");
    }
    console.log({ playerResult, dealerResult });
    // ディーラーのポイントが反映されない、、
    setShowResult(true);
  };
  const surrender = (): void => {};

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
      <ResultDialog
        showModal={showResult}
        result={result}
				bettingPoint={bettingPoint}
        openTop={handleOpenTop}
        onRetry={handleRetry}
      />
    </>
  );
}
