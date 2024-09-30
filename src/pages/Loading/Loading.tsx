import { useState, useEffect, useMemo } from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import styles from "./Loading.module.css";
import useStore from "../../store/store";
import { useCardGame, useCardTutorial } from "../../hooks/useCardGame";
import { AnimatePresence, motion } from "framer-motion";

const FadeInVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Loading() {
  const loading = useStore((state) => state.currentLoading);
  const setCurrentLoading = useStore((state) => state.setCurrentLoading);

  const setGameMode = useStore((state) => state.setGameMode);

  const { onClickCard, cards: tutorialCards } = useCardTutorial();

  const { cards } = useCardGame();

  // useEffect(() => {
  //   //Increase loading by 20 every 1 second, until it reaches 100
  //   const interval = setInterval(() => {
  //     setLoadingVal((prev) => {
  //       if (prev < 100) return prev + 20;
  //       return 100;
  //     });
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   setCurrentLoading(loadingVal);
  // }, [loadingVal]);

  const isFinishedTutorial = useMemo(() => {
    return tutorialCards.filter((card) => card.isMatched === true).length === 2;
  }, [tutorialCards]);

  // useEffect(() => {
  //   if (isFinishedTutorial) {
  //   }
  // }, [isFinishedTutorial]);

  //Handling asset image loading
  useEffect(() => {
    if (!cards || cards.length === 0) return;

    if (loading < 100) {
      let loadedCount = 0;
      const totalCount = cards.length;

      // Load image and return a promise
      function preloadImage(url: string) {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = img.onerror = () => {
            loadedCount++;
            // Calculate progress
            const currentProgress = (loadedCount / totalCount) * 100;
            setCurrentLoading(Math.floor(currentProgress)); // Update progress state
            resolve();
          };
          img.src = url;
        });
      }

      // Map over the cards to preload images
      const preloadPromises = cards.map((card) => preloadImage(card.url));

      // Using Promise.all to know when all images have been processed
      Promise.all(preloadPromises).then(() => {
        console.log("All images processed");
      });
    }
  }, [cards]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={`g-container ${styles["cards-cont"]}`}>
          {tutorialCards.map((card, index) => (
            <Card
              key={index}
              onClickCB={() => {
                onClickCard(card);
              }}
              active={card.isFlipped || card.isMatched}
              url={card.url}
            />
          ))}
        </div>
        <div className={`g-container ${styles["descrip-cont"]}`}>
          <AnimatePresence mode="wait">
            {isFinishedTutorial ? (
              <motion.p
                key="done"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Good job! Now choose a game mode below to play.
              </motion.p>
            ) : (
              <motion.p
                key="tut"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Find and match the same pair of cards, by click to flip the card
                over. Try on the set above, or skip by choosing the game mode
                below.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <div className={`g-container ${styles["percentage-cont"]}`}>
          <AnimatePresence mode="wait">
            {loading === 100 ? (
              <motion.div
                className={`${styles["percentage-cont"]}`}
                key="btn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button
                  onClickCB={() => {
                    setGameMode("single");
                  }}
                  title="Single Player"
                />
                <Button
                  onClickCB={() => {
                    setGameMode("multi");
                  }}
                  title="Multi Player"
                />
              </motion.div>
            ) : (
              <motion.span
                key="percent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {loading}%
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
