import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Button,
  ModalHeader,
  ModalFooter,
} from "@chakra-ui/react";
import { useEffect } from "react";

type PropsType = {
  showGameRuleModal: boolean;
  closeGameRuleModal: () => void;
};

export default function GameRuleModal({
  closeGameRuleModal,
  showGameRuleModal,
}: PropsType): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (showGameRuleModal) {
      onOpen();
    } else {
      onClose();
    }
  }, [showGameRuleModal]);

  return (
    <>
      <Modal
        size="3xl"
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={closeGameRuleModal}
      >
        <ModalOverlay />
        <ModalContent className="!bg-main-color border-white border-2 !rounded-3xl">
          <ModalHeader className="text-center text-white">
            〜ブラックジャックの遊び方〜
          </ModalHeader>
          <ModalBody className="!p-0">
            <div className="p-8 text-white !font-bold">
              カジノディーラーとプレイヤーの対戦型ゲームです。
              <br />
              プレイヤーはカジノディーラーよりも「カードの合計が21点」に近ければ勝利となり、配当を得ることができます。ただしプレイヤーの「カードの合計が21点」を超えてしまうと、その時点で負けとなります。
              <br />
              <br />
              【カードの数え方】
              <br />
              ”2～9”まではそのままの数字、”10・J・Q・K”は「すべて10点」と数えます。また、”A”（エース）は「1点」もしくは「11点」のどちらに数えても構いません。
              <br />
              <br />
              【特別な役】
              <br />
              最初に配られた2枚のカードが”Aと10点札”で21点が完成していた場合を『ブラックジャック』といい、その時点で勝ちとなります。配当は3to2（1.5倍）です。但し、カジノディーラーもブラックジャックだった場合は引き分けとなります。
            </div>
          </ModalBody>

          <ModalFooter className="flex !justify-center">
            <Button
              color="#ffffff"
              size="lg"
              variant="outline"
              mr={3}
              onClick={closeGameRuleModal}
            >
              TOPに戻る
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
