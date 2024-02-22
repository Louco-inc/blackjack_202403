import { Text, Button } from "@chakra-ui/react";

type PropsType = {
  onStart: (phase: string) => void;
  openHowToPlay: () => void;
  openHistory: (phase: string) => void;
};

export default function TopComponent(props: PropsType): JSX.Element {
  const { onStart, openHowToPlay, openHistory } = props;
  return (
    <>
      <div className="">
        <div className="text-end">ポイント数:P</div>
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
