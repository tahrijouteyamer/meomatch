import { useEffect, useState } from "react";
import useStore from "../store/store";
import cat1 from "../assets/cat1.png";
import cat2 from "../assets/cat2.png";

const MOCK_TUTORIAL = [
  {
    id: 1,
    url: cat1,
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 2,
    url: cat2,
    isFlipped: false,
    isMatched: false,
  },

  {
    id: 3,
    url: cat1,
    isFlipped: false,
    isMatched: false,
  },
];

export function useCardGame() {
  const [disabledClick, setDisabledClick] = useState(false);

  const firstCard = useStore((state) => state.firstCard);
  const secondCard = useStore((state) => state.secondCard);

  const cards = useStore((state) => state.cards);

  const setCards = useStore((state) => state.setCards);

  const handleCardClick = useStore((state) => state.handleCardClick);

  const resetCardClicks = useStore((state) => state.resetCardClicks);

  const endGame = useStore((state) => state.endGame);
  const setEndGame = useStore((state) => state.setEndGame);

  //Multiplayer
  const gameMode = useStore((state) => state.currentGameMode);
  const currentPlayer = useStore((state) => state.currentPlayerTurn);
  const player1Score = useStore((state) => state.player1Score);
  const player2Score = useStore((state) => state.player2Score);

  const setPlayer1Score = useStore((state) => state.setPlayer1Score);
  const setPlayer2Score = useStore((state) => state.setPlayer2Score);
  const setCurrentPlayerTurn = useStore((state) => state.setCurrentPlayerTurn);

  const onClickCard = (card: any) => {
    if (disabledClick) return;
    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );

    setCards(newCards);
    handleCardClick(card);
  };

  //Side effects on every clicks
  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabledClick(true);
      if (!endGame) {
        if (firstCard.id === secondCard.id) {
          setDisabledClick(false);
          return;
        }
        if (firstCard.url === secondCard.url) {
          const newCards = cards.map((card) => {
            if (card.url === firstCard.url) {
              return { ...card, isMatched: true };
            }
            return card;
          });
          setCards(newCards);
          setDisabledClick(false);
          resetCardClicks();

          //If Multiplayer, add score to player
          if (gameMode === "multi") {
            if (currentPlayer === "player1") {
              setPlayer1Score(player1Score + 1);
            } else {
              setPlayer2Score(player2Score + 1);
            }
          }
        } else {
          //If not match, flip back the cards
          setTimeout(() => {
            setDisabledClick(false);
            resetCardClicks();
            //If Multiplayer, change the turn
            if (gameMode === "multi") {
              setCurrentPlayerTurn(
                currentPlayer === "player1" ? "player2" : "player1"
              );
            }
          }, 1000);
        }
      }
    }
  }, [firstCard, secondCard, endGame]);

  useEffect(() => {
    if (cards && cards.length > 0) {
      //Check EndGame, but quite expensive
      const isEndGame = cards.every((card) => card.isMatched === true);
      if (isEndGame) {
        setEndGame(true);
      }
    }
  }, [cards]);

  return { onClickCard, setCards, cards };
}

export function useCardTutorial() {
  const [disabledClick, setDisabledClick] = useState(false);

  const firstCard = useStore((state) => state.firstCard);
  const secondCard = useStore((state) => state.secondCard);

  const setFirstCard = useStore((state) => state.setFirstCard);
  const setSecondCard = useStore((state) => state.setSecondCard);

  const cards = useStore((state) => state.tutorialCards);

  const setCards = useStore((state) => state.setTutorialCards);

  // const handleCardClick = useStore((state) => state.handleCardClick);

  const handleCardClick = (card: any) => {
    if (firstCard) {
      setSecondCard(card);
    } else {
      setFirstCard(card);
    }
  };

  const resetCardTutorial = useStore((state) => state.resetCardTutorial);

  const onClickCard = (card: any) => {
    if (disabledClick) return;
    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );

    setCards(newCards);
    handleCardClick(card);
  };

  useEffect(() => {
    setCards(MOCK_TUTORIAL);
  }, []);

  //Side effects on every clicks
  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabledClick(true);
      if (firstCard.id === secondCard.id) {
        setDisabledClick(false);
        return;
      }
      if (firstCard.url === secondCard.url) {
        const newCards = cards.map((card) => {
          if (card.url === firstCard.url) {
            return { ...card, isMatched: true };
          }
          return card;
        });
        setCards(newCards);
        setDisabledClick(false);
        resetCardTutorial();
      } else {
        setTimeout(() => {
          setDisabledClick(false);
          resetCardTutorial();
        }, 1000);
      }
    }
  }, [firstCard, secondCard]);

  return { onClickCard, setCards, cards };
}
