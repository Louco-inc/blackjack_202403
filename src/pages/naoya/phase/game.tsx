import { useEffect, useState } from "react";
import { CardType, PlayerType } from "../../../types";
import { useCardDeck, pick } from "@/hooks/useCardDeck";
import { Button, Text } from "@chakra-ui/react";
import Image from "next/image";

type PropsType = {
  playerData: PlayerType;
  bettingPoint: number;
};

export default function GameComponent(props: PropsType): JSX.Element {
  const { playerData, bettingPoint } = props;
  const [cardDeck, setCardDeck] = useState<CardType[]>([]);
  const [playerHands, setPlayerHands] = useState<CardType[]>([]);
  const [dealerHands, setDealerHands] = useState<CardType[]>([]);

  // トランプデータを生成してランダムに並べ替える
  // プレイヤーとディーラーにカードを2枚ずつ配る
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

  const hit = () => {};
  const double = () => {};
  const stand = () => {};
  const surrender = () => {};

  const cardNumberSum = (cards: CardType[]): number => {
    // TODO: A, K, Q, Jの数字を変換する処理を入れる
    return cards
      .map((card) => Number(card.rank))
      .reduce((total, num) => total + num, 0);
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
              {cardNumberSum(playerHands)}
            </Text>
            <Text className="self-end whitespace-nowrap">
              {playerData.nickname}
            </Text>
            <div className="relative h-60 w-1/2">
              {playerHands.map((hand, i) => {
                const left = `left-${8 * (1 + i)}`;
                return (
                  <div
                    key={hand.imageId}
                    className={"absolute" + ` ${left} z-${i + 1}0`}
                  >
                    <Image
                      src={`/images/back-of-card.png`}
                      alt="トランプの画像"
                      width={160}
                      height={240}
                      objectFit="contain"
                    />
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
            <Text className="self-end whitespace-nowrap">
              {playerData.nickname}
            </Text>
            <div className="relative h-60 w-1/2">
              {playerHands.map((hand, i) => {
                const left = `left-${8 * (1 + i)}`;
                return (
                  <div
                    key={hand.imageId}
                    className={"absolute" + ` ${left} z-${i + 1}0`}
                  >
                    <Image
                      src={`/images/${hand.imageId}.png`}
                      alt="トランプの画像"
                      width={160}
                      height={240}
                      objectFit="contain"
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
            onClick={hit}
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
    </>
  );
}
