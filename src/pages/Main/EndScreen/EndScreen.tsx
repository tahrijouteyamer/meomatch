import { useEffect, useMemo } from "react";
import Modal from "../../../components/Modal/Modal";
import useStore from "../../../store/store";
import styles from "./EndScreen.module.css";
import Button from "../../../components/Button/Button";
import { formatTime } from "../../../utils/time";

export default function EndScreen() {
  const gameMode = useStore((state) => state.currentGameMode);
  const endGame = useStore((state) => state.endGame);
  const winner = useStore((state) => state.winnerData as any);
  const setWinner = useStore((state) => state.setWinnerData);

  const player1Score = useStore((state) => state.player1Score);
  const player2Score = useStore((state) => state.player2Score);

  const elapsedTime = useStore((state) => state.elapsedTime);

  const newGame = useStore((state) => state.newGame);

  useEffect(() => {
    if (endGame) {
      if (gameMode === "single") {
        //Already set at Overlay
        // setWinner({ time: elapsedTime });
      } else if (gameMode === "multi") {
        const playerWinner =
          player1Score > player2Score ? "player1" : "player2";
        setWinner({
          player: playerWinner,
          score: Math.max(player1Score, player2Score),
          draw: player1Score === player2Score ? true : false,
        });
      }
    }
  }, [endGame]);

  const variantWinnerType = useMemo(() => {
    if (winner) {
      if (gameMode === "single" || winner.draw) {
        return "single";
      } else if (gameMode === "multi") {
        if (winner.player === "player1") {
          return "player1";
        } else if (winner.player === "player2") {
          return "player2";
        }
      }
    }
  }, [winner]);

  return (
    <Modal>
      <div className={styles.wrapper}>
        <div className={styles.container} data-variant={variantWinnerType}>
          <div className={styles.innerCont}>
            <h3 className={styles.complete}>Complete</h3>
            {gameMode === "single" ? (
              <p className={styles.content}>Time: {formatTime(winner?.time)}</p>
            ) : winner && winner.draw ? (
              <p className={styles.content}>Draw!</p>
            ) : (
              <p className={styles.content}>{winner?.player} won!</p>
            )}
            <div className={styles.btnCont}>
              <Button
                onClickCB={() => {
                  newGame(gameMode);
                }}
                title="New Game"
                variants="secondary"
              />
              <Button
                onClickCB={() => {
                  newGame(gameMode === "multi" ? "single" : "multi");
                }}
                variants="secondary"
                title={gameMode === "multi" ? "Single Player" : "Multiplayer"}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
