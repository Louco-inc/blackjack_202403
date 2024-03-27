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
  bettingPoint: number;
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
    bettingPoint,
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
        <ModalContent className="bg-main-color text-white border grid justify-items-center">
          <ModalHeader>
            <Image src={`/images/${result}.png`} />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              <div className="w-1/2 grid justify-items-center">
                <div>{playerData.nickname}</div>
                <HStack>
                  {playerHands.map((hand, i) => {
                    console.dir(hand);
                    return (
                      <Image
                        key={hand.imageId}
                        src={`/images/${hand.imageId}.png`}
                        className="w-1/3"
                      />
                    );
                  })}
                </HStack>
                <div>{playerPoint}</div>
              </div>
              <div className="w-1/2 grid justify-items-center">
                <div>ディーラー</div>
                <HStack>
                  {dealerHands.map((hand, i) => {
                    console.dir(hand);
                    return (
                      <Image
                        key={hand.imageId}
                        src={`/images/${hand.imageId}.png`}
                        className="w-1/3"
                      />
                    );
                  })}
                </HStack>
                <div>{dealerPoint}</div>
              </div>
            </HStack>
            <div className="border-t"></div>
            <HStack>
              <div>ベットポイント</div>
              <div>{bettingPoint}P</div>
            </HStack>
            <HStack>
              <div>獲得ポイント</div>
              <div>P</div>
            </HStack>
            <HStack>
              <div>現在のポイント</div>
              <div>P</div>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button variant='outline' className="text-white" mr={3} onClick={onClose}>
              TOPに戻る
            </Button>
            <Button colorScheme='yellow' className="text-white" variant='solid'>続ける</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
