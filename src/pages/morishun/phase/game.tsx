import { useEffect, useState } from "react";
import { CardType, PlayerType } from "@/types";
import { Button, HStack, Image, Text } from "@chakra-ui/react";
import { pick, useCardDeck } from "@/hooks/useCardDeck";

type PropsType = {
  playerData: PlayerType;
  bettingPoint: number;
  betDoublePoint: () => void;
  openTop: () => void;
  onRetry: () => void;
  onFinishedGame: (point: number) => void;
};

export default function GameComponent(props: PropsType): JSX.Element {
  // const {
  //   playerData,
  //   bettingPoint,
  //   betDoublePoint,
  //   openTop,
  //   onRetry,
  //   onFinishedGame,
  // } = props;
  const [cardDeck, setCardDeck] = useState<CardType[]>(() => useCardDeck());
  const [playerHands, setPlayerHands] = useState<CardType[]>([]);
  const [dealerHands, setDealerHands] = useState<CardType[]>([]);
  const [playerResultPoint, setPlayerResultPoint] = useState<number>(0);
  const [dealerResultPoint, setDealerResultPoint] = useState<number>(0);

  // 初期表示
  useEffect(() => {
    const init = (): void => {
      const playerCard1 = pick(cardDeck, setCardDeck);
      const playerCard2 = pick(cardDeck, setCardDeck);
      setPlayerHands([playerCard1, playerCard2]);
      const dealerCard1 = pick(cardDeck, setCardDeck);
      const dealerCard2 = pick(cardDeck, setCardDeck);
      setDealerHands([dealerCard1, dealerCard2]);
      // 各プレイヤーの得点を計算
      const playerScore: number = cardNumberSum(playerHands);
      const dealerScore: number = cardNumberSum(dealerHands);
      setPlayerResultPoint(playerScore);
      setDealerResultPoint(dealerScore);
    };
    init();
  }, []);

  // 点数計算処理
  /**
   * CardTypeの配列を引数で受けとり、number型の合計点数を返す
   * @param cards 手札のデータ
   */
  const cardNumberSum = (cards: CardType[]): number => {
    const score = cards.map((card) => Number(card.rank)).reduce((total, num) => {
      // J、Q、Kは10点として加算する
      if(num > 10){
        return total + 10;
      }
      // 10以下のカードはそのまま加算
      return total + num;
    }, 0);
    return score;
  }

  return (
    <>
      <div className="h-full relative text-white">
        <div className="absolute top-0 right-0">
          <div>ポイント</div>
        </div>
        <div className="grid justify-items-center h-2/6">
          <div>ディーラー</div>
          <div>ポイント：{dealerResultPoint}</div>
          <HStack
            className="h-4/5"
          >
            {dealerHands.map((hand, i) => {
              return(
                <Image 
                  key={hand.imageId}
                  src={`/images/${hand.imageId}.png`}
                  className="h-5/6"
                />
              );
            })}
          </HStack>
        </div>
        <div className="grid justify-items-center h-3/6">
          <div>手札</div>
          <div>ポイント：{playerResultPoint}</div>
          <HStack>
            {playerHands.map((hand, i) => {
              return(
                <Image 
                  key={hand.imageId}
                  src={`/images/${hand.imageId}.png`}
                />
              );
            })}
          </HStack>
        </div>
        <div className="grid justify-items-center h-1/6">
          <HStack className="w-4/5">
            <Button
              className="w-1/4 mx-1"
              colorScheme="white"
              variant="outline"
              size="lg"
              onClick={() => {}}
            >
              <Text>ヒット</Text>
            </Button>
            <Button
              className="w-1/4 mx-1"
              colorScheme="white"
              variant="outline"
              size="lg"
              onClick={() => {}}
            >
              <Text>ダブル</Text>
            </Button>
            <Button
              className="w-1/4 mx-1"
              colorScheme="white"
              variant="outline"
              size="lg"
              onClick={() => {}}
            >
              <Text>スタンド</Text>
            </Button>
            <Button
              className="w-1/4 mx-1"
              colorScheme="white"
              variant="outline"
              size="lg"
              onClick={() => {}}
            >
              <Text>サレンダー</Text>
            </Button>
          </HStack>
        </div>
      </div>
    </>
  );
}
