import { Text, Button } from "@chakra-ui/react";
import Image from "next/image";

type PropsType = {
  playerPoint: number;
  onStart: (phase: string) => void;
  openHowToPlay: () => void;
  openHistory: (phase: string | undefined) => void;
};

export default function TopComponent(props: PropsType): JSX.Element {
  const { playerPoint, onStart, openHowToPlay, openHistory } = props;
  return (
    <>
      <div className="flex justify-end pt-3">
        <div className="flex items-center bg-white rounded-2xl px-4">
          <Image
            className="inline-block"
            src={"/images/point-icon.png"}
            alt="ポイントアイコン"
            width={48}
            height={48}
          />
          <div className="inline-block text-main-color font-bold text-4xl leading-9 pl-3">
            {playerPoint >= 0 ? playerPoint : "ー"}P
          </div>
        </div>
      </div>
      <Text fontSize="6xl" className="font-bold text-center mt-32 mb-16">
        BlackJack
      </Text>
      <div className="flex flex-col justify-center items-center">
        <div>
          <Button
            className=""
            bgColor="primaryButtonColor"
            color="#ffffff"
            size="lg"
            onClick={() => onStart("nickname")}
          >
            スタート
          </Button>
        </div>
        <div>
          <Button
            className="mt-4"
            color="#ffffff"
            size="lg"
            variant="outline"
            onClick={openHowToPlay}
          >
            遊び方
          </Button>
        </div>
        <div>
          <Button
            className="mt-4"
            color="#ffffff"
            size="lg"
            variant="ghost"
            onClick={() => openHistory("history")}
          >
            戦績
          </Button>
        </div>
      </div>
    </>
  );
}
