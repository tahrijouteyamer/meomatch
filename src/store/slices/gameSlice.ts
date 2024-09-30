import { StateCreator } from "zustand";
import { StoreState } from "../store";

export type GAMEMODE = "single" | "multi" | null;

export const MOCK_CARDS = [
  {
    id: 1,
    url: "https://picsum.photos/id/1/200/300",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 2,
    url: "https://picsum.photos/id/2/200/300",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 3,
    url: "https://picsum.photos/id/3/200/300",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 4,
    url: "https://picsum.photos/id/4/200/300",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 5,
    url: "https://picsum.photos/id/1/200/300",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 6,
    url: "https://picsum.photos/id/2/200/300",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 7,
    url: "https://picsum.photos/id/3/200/300",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 8,
    url: "https://picsum.photos/id/4/200/300",
    isFlipped: false,
    isMatched: false,
  },
];

type Card = {
  id: number;
  url: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export type GameState = {
  currentGameMode: GAMEMODE;
  setGameMode: (gameMode: GAMEMODE) => void;
  currentLoading: number;
  setCurrentLoading: (currentLoading: number) => void;
  cards: Card[];
  setCards: (cards: Card[]) => void;
  firstCard: Card | null;
  setFirstCard: (card: Card | null) => void;
  secondCard: Card | null;
  setSecondCard: (card: Card | null) => void;
  handleCardClick: (card: Card) => void;
  resetCardClicks: () => void;
  resetCardTutorial: () => void;
  tutorialCards: Card[];
  setTutorialCards: (cards: Card[]) => void;

  elapsedTime: number;
  setElapsedTime: (elapsedTime: number) => void;
  bestTime: number;
  setBestTime: (bestTime: number) => void;

  currentPlayerTurn: "player1" | "player2" | null;
  setCurrentPlayerTurn: (player: "player1" | "player2" | null) => void;
  player1Score: number;
  setPlayer1Score: (score: number) => void;
  player2Score: number;
  setPlayer2Score: (score: number) => void;

  endGame: boolean;
  setEndGame: (endGame: boolean) => void;

  winnerData:
    | { time: number }
    | { player: string; score: number; draw: boolean }
    | null;
  setWinnerData: (
    winnerData:
      | { time: number }
      | { player: string; score: number; draw: boolean }
      | null
  ) => void;

  newGame: (gameMode: GAMEMODE) => void;
};

export const createGameSlice: StateCreator<StoreState, [], [], GameState> = (
  set,
  get
) => ({
  currentGameMode: null,
  setGameMode: (gameMode: GAMEMODE) => set({ currentGameMode: gameMode }),
  currentLoading: 0,
  setCurrentLoading: (currentLoading: number) => set({ currentLoading }),
  cards: [],
  setCards: (cards: Card[]) => set({ cards }),
  firstCard: null,
  setFirstCard: (card: Card | null) => set({ firstCard: card }),
  secondCard: null,
  setSecondCard: (card: Card | null) => set({ secondCard: card }),
  handleCardClick: (card: Card) => {
    if (get().firstCard) {
      get().setSecondCard(card);
    } else {
      get().setFirstCard(card);
    }
  },
  resetCardClicks: () => {
    const resetFlippedCards = get().cards.map((card) => ({
      ...card,
      isFlipped: false,
    }));

    set({ firstCard: null, secondCard: null, cards: resetFlippedCards });
  },

  resetCardTutorial: () => {
    const resetFlippedCards = get().tutorialCards.map((card) => ({
      ...card,
      isFlipped: false,
    }));

    set({
      firstCard: null,
      secondCard: null,
      tutorialCards: resetFlippedCards,
    });
  },
  tutorialCards: [],
  setTutorialCards: (cards: Card[]) => set({ tutorialCards: cards }),

  elapsedTime: 0,
  setElapsedTime: (elapsedTime: number) => set({ elapsedTime }),
  bestTime: parseInt(localStorage.getItem("bestTime") || "0"),
  setBestTime: (bestTime: number) => {
    localStorage.setItem("bestTime", bestTime.toString());
    set({ bestTime });
  },

  currentPlayerTurn: "player1",
  setCurrentPlayerTurn: (player: "player1" | "player2" | null) =>
    set({ currentPlayerTurn: player }),
  player1Score: 0,
  setPlayer1Score: (score: number) => set({ player1Score: score }),
  player2Score: 0,
  setPlayer2Score: (score: number) => set({ player2Score: score }),

  endGame: false,
  setEndGame: (endGame: boolean) => set({ endGame }),

  winnerData: null,
  setWinnerData: (
    winnerData:
      | { time: number }
      | { player: string; score: number; draw: boolean }
      | null
  ) => set({ winnerData }),

  newGame: (gameMode) => {
    const restartMatchedCardsAndShuffled = get()
      .cards.map((card) => ({ ...card, isMatched: false, isFlipped: false }))
      .sort(() => Math.random() - 0.5);

    return set({
      currentGameMode: gameMode,
      cards: restartMatchedCardsAndShuffled,
      firstCard: null,
      secondCard: null,
      elapsedTime: 0,
      currentPlayerTurn: "player1",
      player1Score: 0,
      player2Score: 0,
      endGame: false,
      winnerData: null,
    });
  },
});
