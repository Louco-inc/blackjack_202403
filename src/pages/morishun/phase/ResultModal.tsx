import { CardType, PlayerType, ResultType } from "@/types";
import {
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
} from "@chakra-ui/react";

type PropsType = {
  isOpen: boolean;
  onClose: () => void;
  playerData: PlayerType;
  playerHands: CardType[];
  playerPoint: number;
  dealerHands: CardType[];
  dealerPoint: number;
  result: ResultType;
};

export default function ResultModal(props: PropsType): JSX.Element {
  const {
    isOpen,
    onClose,
    playerData,
    playerHands,
    playerPoint,
    dealerHands,
    dealerPoint,
    result,
  } = props;
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Image src={`/images/${result}.png`} />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              <div className="w-1/2">
                <div>{playerData.nickname}</div>
                <HStack>
                  {playerHands.map((hand, i) => {
                    console.dir(hand);
                    return (
                      <Image
                        key={hand.imageId}
                        src={`/images/${hand.imageId}.png`}
                      />
                    );
                  })}
                </HStack>
                <div>{playerPoint}</div>
              </div>
              <div className="w-1/2">
                <div>ディーラー</div>
                <HStack>
                  {dealerHands.map((hand, i) => {
                    console.dir(hand);
                    return (
                      <Image
                        key={hand.imageId}
                        src={`/images/${hand.imageId}.png`}
                      />
                    );
                  })}
                </HStack>
                <div>{dealerPoint}</div>
              </div>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
