import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useEffect } from "react";
import Image from "next/image";

type PropsType = {
  showModal: boolean;
  result: "win" | "draw" | "lose";
  bettingPoint: number;
  getPoint: number;
  currentPoint: number;
  openTop: () => void;
  onRetry: () => void;
};

export default function ResultModal({
  showModal,
  result,
  bettingPoint,
  getPoint,
  currentPoint,
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
                    src={`/images/win.png`}
                    alt="勝ち"
                    width={200}
                    height={80}
                  />
                )}
                {result === "lose" && (
                  <Image
                    src={`/images/lose.png`}
                    alt="負け"
                    width={200}
                    height={80}
                  />
                )}
              </div>
              <div className="my-8">
                <div></div>
                <div className="text-white">
                  <div>
                    <span>ベットポイント</span>
                    <span>{bettingPoint}P</span>
                  </div>
                  <div>
                    <span>獲得ポイント</span>
                    <span>{getPoint}P</span>
                  </div>
                  <div>
                    <span>現在のポイント</span>
                    <span>{currentPoint}P</span>
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
