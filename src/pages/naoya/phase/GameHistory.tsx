import { CardType, PlayerType, ResultType } from "@/types";
import { formattedDate } from "@/utils";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  ModalFooter,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";

type PropsType = {
  showHistoryModal: boolean;
  closeHistoryModal: () => void;
};

type HistoryType = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  matchDay: Date;
  gameDate: string;
  result: ResultType;
  increasePoint: number;
  decreasePoint: number;
  currentPoint: number;
  finishedPoint: number;
  player: PlayerType;
  resultImageId: string;
  playerPoint: number;
  dealerPoint: number;
  playerHandCards: CardType[];
  dealerHandCards: CardType[];
};

export default function GameHistory(props: PropsType): JSX.Element {
  const { showHistoryModal, closeHistoryModal } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [histories, setHistories] = useState<HistoryType[]>([]);

  useEffect(() => {
    if (showHistoryModal) {
      initializeHistories();
    } else {
      onClose();
    }
  }, [showHistoryModal]);

  const initializeHistories = async (): Promise<void> => {
    const historiesData: HistoryType[] = await fetch("/api/history").then(
      async (r) => {
        const histories = await r.json();
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
        return histories.map((history: HistoryType) => ({
          ...history,
          gameDate: formattedDate(history.matchDay),
          resultImageId: `/images/${history.result}.png`,
          playerPoint: cardNumberSum(history.playerHandCards),
          dealerPoint: cardNumberSum(history.dealerHandCards),
          finishedPoint:
            history.result === "win"
              ? `+${history.increasePoint}`
              : history.result === "lose"
                ? `-${history.decreasePoint}`
                : 0,
        }));
      }
    );
    setHistories(historiesData);
    onOpen();
  };
  return (
    <>
      <Modal size="6xl" isOpen={isOpen} onClose={closeHistoryModal}>
        <ModalOverlay />
        <ModalContent className="!bg-main-color border-white border-2 !rounded-3xl">
          <ModalBody className="!p-0">
            <TableContainer
              overflowY="auto"
              className="px-8 pb-8 text-white !font-bold max-h-[500px] whitespace-nowrap top-0"
            >
              <Table variant="simple" className="table-auto">
                <Thead className="sticky top-0 z-50 !bg-main-color">
                  <Tr>
                    <Th className="!text-white !text-xl">日付</Th>
                    <Th className="!text-white !text-xl">結果</Th>
                    <Th className="!text-white !text-xl">手札</Th>
                    <Th className="!text-white !text-xl">+/-</Th>
                    <Th className="!text-white !text-xl">累計</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {histories.map((history) => {
                    return (
                      <Tr key={history.id} className="!text-2xl">
                        <Td>{history.gameDate}</Td>
                        <Td>
                          <Image
                            className="m-auto"
                            src={history.resultImageId}
                            alt="負け"
                            width={135}
                            height={48}
                          />
                        </Td>
                        <Td className="!p-0">
                          <div className="w-72 flex justify-center">
                            <div className="relative h-24 w-full">
                              {history.playerHandCards.map((hand, i) => {
                                const leftPosition = `${10 * i}px`;
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
                                      width={60}
                                      height={90}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                            <div className="self-center">
                              {history.playerPoint}
                            </div>
                            <div className="relative h-24 w-full">
                              {history.dealerHandCards.map((hand, i) => {
                                const leftPosition = `${10 * i}px`;
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
                                      width={60}
                                      height={90}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                            <div className="self-center">
                              {history.dealerPoint}
                            </div>
                          </div>
                        </Td>
                        <Td>{history.finishedPoint}</Td>
                        <Td>{history.currentPoint}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter className="flex !justify-center">
            <Button
              color="#ffffff"
              size="lg"
              variant="outline"
              mr={3}
              onClick={closeHistoryModal}
            >
              TOPに戻る
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
