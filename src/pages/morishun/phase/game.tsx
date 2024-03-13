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
  const {
    playerData,
    bettingPoint,
    // betDoublePoint,
    // openTop,
    // onRetry,
    // onFinishedGame,
  } = props;
  const [cardDeck, setCardDeck] = useState<CardType[]>(() => useCardDeck());
  const [playerHands, setPlayerHands] = useState<CardType[]>([]);
  const [dealerHands, setDealerHands] = useState<CardType[]>([]);

  // 初期表示
  useEffect(() => {
    const init = (): void => {
      console.log(cardDeck);
      const playerCard1 = pick(cardDeck, setCardDeck);
      const playerCard2 = pick(cardDeck, setCardDeck);
      setPlayerHands([playerCard1, playerCard2]);
      const dealerCard1 = pick(cardDeck, setCardDeck);
      const dealerCard2 = pick(cardDeck, setCardDeck);
      setDealerHands([dealerCard1, dealerCard2]);
    };
    init();
  }, []);

  // バースト判定処理
  useEffect(() => {
    const burst = (): void => {
      if (cardNumberSum(playerHands) > 21) {
        // TODO:画面描画よりも先にアラートが出てしまうので、やむなくsetTimeoutを使用。setTimeoutを使わずに、左記を実現できるように修正する。
        setTimeout(() => {
          alert("バースト");
        }, 1000);
      }
    };
    burst();
  }, [playerHands]);

  // 点数計算処理
  /**
   * CardTypeの配列を引数で受けとり、number型の合計点数を返す
   * @param cards 手札のデータ
   */
  const cardNumberSum = (cards: CardType[]): number => {
    const point = cards
      .map((card) => Number(card.rank))
      .reduce((total, num) => {
        // J、Q、Kは10点として加算する
        if (num > 10) {
          return total + 10;
        }
        // 10以下のカードはそのまま加算
        return total + num;
      }, 0);
    return point;
  };

  // ヒット処理
  /**
   * カードを１枚引く
   * 合計点数を加算
   * 合計点数が22点未満 → そのまま自陣にカードを表向きで１枚追加
   * 合計点数が22点以上 → バースト処理
   */
  const hit = (): void => {
    // カードを１枚引く
    const pickedPlayerCard = pick(cardDeck, setCardDeck);
    // const newPoint =
    //   cardNumberSum(playerHands) + cardNumberSum([pickedPlayerCard]);
    setPlayerHands((prev) => [...prev, pickedPlayerCard]);
    // 合計点数が22点以上 → バースト処理
    // if (newPoint > 22) {
    //   alert("バースト");
    // }
  };

  return (
    <>
      <div className="h-full relative text-white">
        <div className="absolute top-0 right-0 grid justify-items-center">
          <div>ポイント</div>
          <div>{playerData.point}P</div>
          <div>Bet：{bettingPoint}P</div>
        </div>
        <div className="grid justify-items-center h-2/6">
          <div>ディーラー</div>
          <div>ポイント：{cardNumberSum(dealerHands)}</div>
          <HStack className="h-4/5">
            {dealerHands.map((hand, i) => {
              console.dir(hand);
              return (
                <Image
                  key={hand.imageId}
                  src={`/images/back-of-card.png`}
                  className="h-5/6"
                />
              );
            })}
          </HStack>
        </div>
        <div className="grid justify-items-center h-3/6">
          <div>{playerData.nickname}</div>
          <div>ポイント：{cardNumberSum(playerHands)}</div>
          <HStack>
            {playerHands.map((hand, i) => {
              console.dir(hand);
              return (
                <Image key={hand.imageId} src={`/images/${hand.imageId}.png`} />
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
              onClick={hit}
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
