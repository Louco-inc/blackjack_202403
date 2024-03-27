import { useEffect, useState } from "react";
import { CardType, PlayerType, ResultType } from "@/types";
import { Button, HStack, Image, Text, useDisclosure } from "@chakra-ui/react";
import { pick, useCardDeck } from "@/hooks/useCardDeck";
import ResultModal from "../phase/ResultModal";

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
  const [result, setResult] = useState<ResultType>("win");
  const [playerPoint, setPlayerPoint] = useState<number>(0);
  const [dealerPoint, setDealerPoint] = useState<number>(0);
  const [isDealerCardOpen, setIsDealerCardOpen] = useState<boolean>(false);
  const {
    isOpen: isOpenResultModal,
    onOpen: onOpenResultModal,
    onClose: onCloseResultModal,
  } = useDisclosure();

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

  // プレイヤーの手札が更新された際の処理
  /**
   * プレイヤーのポイントを設定
   * プレイヤーのポイントが21点より大きくなってしまった場合、バースト処理実行
   */
  useEffect(() => {
    // プレイヤーの手札の合計点をステートで保持
    setPlayerPoint(cardNumberSum(playerHands));
    // バースト判定処理
    /**
     * 結果を「負け」に設定する
     * 結果のモーダルを表示させる
     */
    const burst = (): void => {
      // TODO:画面描画よりも先にアラートが出てしまうので、やむなくsetTimeoutを使用。setTimeoutを使わずに、左記を実現できるように修正する。
      setTimeout(() => {
        // 結果を「負け」に設定
        setResult("lose");
        // 結果のモーダルを表示
        onOpenResultModal();
      }, 1000);
    };
    // 合計点数が21点より大きくなってしまった場合、バースト処理実行
    if (cardNumberSum(playerHands) > 21) {
      burst();
    }
  }, [playerHands]);

  // ディーラーの手札が更新された際の処理
  /**
   * ディーラーのポイントを設定
   */
  useEffect(() => {
    // ディーラーの手札の合計点をステートで保持
    setDealerPoint(cardNumberSum(dealerHands));
  }, [dealerHands]);

  // ディーラーのポイントが更新された際の処理
  /**
   * 17点以上になった時点でスタンド
   */
  useEffect(() => {
    // 17点以上の場合は、勝敗の判定をし、結果のモーダルを表示させる
    if(dealerPoint >= 17){
      resultSet();
    }
  }, [dealerPoint]);

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
    setPlayerHands((prev) => [...prev, pickedPlayerCard]);
  };

  // スタンド処理
  const stand = (): void => {
    // ディーラーのポイントが17点以上になるまで1枚引き続ける
    let currentDealerPoint: number = cardNumberSum(dealerHands);
    const currentDealerHands: CardType[] = dealerHands;
    while (currentDealerPoint < 17) {
      const pickedDealerCard = pick(cardDeck, setCardDeck);
      currentDealerHands.push(pickedDealerCard);
      currentDealerPoint = cardNumberSum(currentDealerHands);
      console.log(currentDealerPoint);
    }
    setDealerHands(currentDealerHands);
    // ディーラーのカードをオープン
    setIsDealerCardOpen(true);
  };

  // 結果のセット
  const resultSet = (): void => {
    // 勝敗の設定
    if (dealerPoint > 21 || playerPoint > dealerPoint) {
      setResult("win");
    } else if (playerPoint === dealerPoint) {
      setResult("draw");
    } else {
      setResult("lose");
    }
    // 結果のモーダルを表示
    // TODO:画面描画よりも先にアラートが出てしまうので、やむなくsetTimeoutを使用。setTimeoutを使わずに、左記を実現できるように修正する。
    setTimeout(() => {
      onOpenResultModal();
    }, 1000);
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
          <div>ポイント：{dealerPoint}</div>
          <HStack className="h-4/5">
            {dealerHands.map((hand, i) => {
              console.dir(hand);
              return (
                <div key={hand.imageId} className="h-full">
                  {isDealerCardOpen ? (
                    <Image
                      src={`/images/${hand.imageId}.png`}
                      className="h-5/6"
                    />
                  ) : (
                    <Image src={`/images/back-of-card.png`} className="h-5/6" />
                  )}
                </div>
              );
            })}
          </HStack>
        </div>
        <div className="grid justify-items-center h-3/6">
          <div>{playerData.nickname}</div>
          <div>ポイント：{playerPoint}</div>
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
              onClick={stand}
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
      <ResultModal
        isOpen={isOpenResultModal}
        onClose={onCloseResultModal}
        playerData={playerData}
        bettingPoint={bettingPoint}
        playerHands={playerHands}
        playerPoint={playerPoint}
        dealerHands={dealerHands}
        dealerPoint={dealerPoint}
        result={result}
      />
    </>
  );
}
