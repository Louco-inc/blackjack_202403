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

type PropsType = {
  showModal: boolean;
  result: "win" | "draw" | "lose";
  bettingPoint: number;
  resultPoint: number;
  finishedPoint: number;
  openTop: () => void;
  onRetry: () => void;
};

export default function ResultModal({
  showModal,
  result,
  bettingPoint,
  resultPoint,
  finishedPoint,
  openTop,
  onRetry,
}: PropsType): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (showModal) {
      onOpen();
    }
  }, [showModal]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody className="!p-0">
            <div className="bg-main-color p-8">
              <div className="mb-8">
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
                    <span>{finishedPoint}P</span>
                  </div>
                </div>
              </div>
              <div className="flex">
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
