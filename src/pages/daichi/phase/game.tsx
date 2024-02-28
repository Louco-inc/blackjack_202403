import { PlayerType } from "@/types";

type PropsType = {
  playerData: PlayerType;
  bettingPoint: number;
  betDoublePoint: () => void;
  openTop: () => void;
  onRetry: () => void;
  onFinishedGame: (point: number) => void;
};

export default function GameComponent(props: PropsType): JSX.Element {
  return (
    <>
      <div className="h-full relative text-white">ゲーム画面</div>
    </>
  );
}
