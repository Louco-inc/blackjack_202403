export type InputStateType = string | number | undefined;
export type PlayerType = {
  id: number;
  nickname: string;
  uuid: string;
  point: number;
};
export type SuitType = "club" | "diamond" | "heart" | "spade";
export type CardType = {
  suit: SuitType;
  rank: string;
  imageId: string;
};
export type ResultType = "win" | "draw" | "lose";
