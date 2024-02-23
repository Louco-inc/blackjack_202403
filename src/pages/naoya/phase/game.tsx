import { PlayerType } from "../../../types";

type PropsType = {
  playerData: PlayerType;
  bettingPoint: number;
};

export default function GameComponent(props: PropsType): JSX.Element {
  const { playerData, bettingPoint } = props;

  return (
    <>
      <div>
        <div className="">
          <div className="text-end">ポイント数: {playerData.point}P</div>
          <div className="text-end">Bet: {bettingPoint}P</div>
        </div>
        <div className=""></div>
      </div>
    </>
  );
}
