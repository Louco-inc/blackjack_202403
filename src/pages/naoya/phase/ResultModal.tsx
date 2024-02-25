import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useEffect } from "react";
import Image from "next/image";
import { CardType, PlayerType } from "@/types";

type PropsType = {
  showModal: boolean;
  result: "win" | "draw" | "lose";
  bettingPoint: number;
  resultPoint: number;
  playerData: PlayerType;
  playerHands: CardType[];
  dealerHands: CardType[];
  playerResultPoint: number;
  dealerResultPoint: number;
  openTop: () => void;
  onRetry: () => void;
};

export default function ResultModal({
  showModal,
  result,
  bettingPoint,
  resultPoint,
  playerData,
  playerResultPoint,
  dealerResultPoint,
  playerHands,
  dealerHands,
  openTop,
  onRetry,
}: PropsType): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (showModal) {
      const open = async (): Promise<void> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        onOpen();
      };
      open();
    }
  }, [showModal]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody className="!p-0">
            <div className="bg-main-color p-8">
              <div className="">
                {result === "win" && (
                  <Image
                    className="m-auto"
                    src={`/images/win.png`}
                    alt="勝ち"
                    width={200}
                    height={80}
                  />
                )}
                {result === "lose" && (
                  <Image
                    className="m-auto"
                    src={`/images/lose.png`}
                    alt="負け"
                    width={200}
                    height={80}
                  />
                )}
                {result === "draw" && (
                  <Image
                    className="m-auto"
                    src={`/images/draw.png`}
                    alt="引き分け"
                    width={200}
                    height={80}
                  />
                )}
              </div>
              <div className="text-white flex justify-center h-52">
                <div className="w-1/2 text-center font-bold">
                  <div>{playerData.nickname}</div>
                  <div className="relative h-36 mt-2 mx-6">
                    {playerHands.map((hand, i) => {
                      const leftPosition = `${15 * i}px`;
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
                            width={90}
                            height={135}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="font-bold">{playerResultPoint}</div>
                </div>
                <div className="w-1/2 text-center font-bold">
                  <div>ディーラー</div>
                  <div className="relative h-36 mt-2 mx-6">
                    {dealerHands.map((hand, i) => {
                      const leftPosition = `${15 * i}px`;
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
                            width={90}
                            height={135}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div>{dealerResultPoint}</div>
                </div>
              </div>
              <div className="w-96 border"></div>
              <div className="my-8">
                <div></div>
                <div className="text-white font-bold">
                  <div className="flex justify-around mb-4">
                    <span>ベットポイント</span>
                    <span>{bettingPoint}P</span>
                  </div>
                  <div className="flex justify-around mb-4">
                    <span>獲得ポイント</span>
                    <span>{resultPoint}P</span>
                  </div>
                  <div className="flex justify-around">
                    <span>現在のポイント</span>
                    <span>{playerData.point}P</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  color="#ffffff"
                  size="lg"
                  variant="outline"
                  mr={3}
                  onClick={openTop}
                >
                  TOPに戻る
                </Button>
                <Button
                  bgColor="primaryButtonColor"
                  color="#ffffff"
                  size="lg"
                  mr={3}
                  onClick={onRetry}
                >
                  続ける
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
