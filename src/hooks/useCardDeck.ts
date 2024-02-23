import { CardType, SuitType } from "@/types";
import { Dispatch, SetStateAction } from "react";

// カードオブジェクトの生成
const createCard = (suit: SuitType, rank: string): CardType => {
  return {
    suit,
    rank,
    imageId: `${suit}${rank}`,
  };
};

// シャッフル
const shuffle = (cardDeck: CardType[]): CardType[] => {
  const cloneCardDeck: CardType[] = [...cardDeck];
  for (let i = cloneCardDeck.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    const temp = cloneCardDeck[i];
    cloneCardDeck[i] = cloneCardDeck[r];
    cloneCardDeck[r] = temp;
  }
  return cloneCardDeck;
};

// デッキの生成
export const useCardDeck = (): CardType[] => {
  const suitTypes: SuitType[] = ["club", "diamond", "heart", "spade"];
  const cardDeck: CardType[] = suitTypes.flatMap((suit) => {
    return [...Array(13)].map((_, i) => {
      return createCard(suit, String(i + 1));
    });
  });
  const shuffledCardDeck = shuffle(cardDeck);
  return shuffledCardDeck;
};

// デッキから一枚引く
export const pick = (
  cardDeck: CardType[],
  setCardDeck: Dispatch<SetStateAction<CardType[]>>
): CardType => {
  const drawingCard = cardDeck.splice(0, 1)[0];
  setCardDeck(cardDeck);
  return drawingCard;
};
