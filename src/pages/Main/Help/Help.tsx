import { useRef } from "react";
import CrossSVG from "../../../SVG/CrossSVG";
import Modal from "../../../components/Modal/Modal";
import useStore from "../../../store/store";
import styles from "./Help.module.css";

export default function Help() {
  const setHelpOpen = useStore((state) => state.setHelpOpen);

  return (
    <Modal>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.innerCont}>
            <div
              className={styles.svgBubble}
              onClick={() => setHelpOpen(false)}
            >
              <CrossSVG color="var(--text-primary)" />
            </div>

            <div
              data-lenis-prevent
              className={styles.scrollCont}
              // onWheel={(event) => event.stopPropagation()}
            >
              <h4 className={styles.title}>How to Play</h4>
              <p className={styles.descrip}>
                In the memory card game, your objective is to identify pairs of
                matching cards. Start by clicking (using the Left Mouse button)
                on a card to reveal its face. Then, click on another card to see
                if it matches the first. If you find a matching pair, both cards
                will remain face up. Continue this process until you've
                successfully matched all pairs of cards to complete the game.
              </p>

              <div className={styles.textRowCont}>
                <div className={styles.textColCont}>
                  <h5 className={styles.heading}>Single player</h5>
                  <p className={styles.descrip}>
                    This game mode has a timer, the less time it takes for
                    player to find all the pairs of matching cards, the higher
                    the score value will be.
                  </p>
                  <p className={styles.descrip}>
                    The game end when the player have found all the matching
                    pairs. The score is then being recorded, and decided if it
                    would be the new high best score.
                  </p>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.textColCont}>
                  <h5 className={styles.heading}>Multiplayer</h5>
                  <p className={styles.descrip}>
                    This is a hot-seat game multiplayer game mode, where two
                    players take turns to play, in the same screen.
                  </p>
                  <p className={styles.descrip}>
                    Player 1 will start first. On flipping a non-matching pairs
                    of cards, the turn ended, and another player’s turn starts.
                    On flipping a matching pairs of cards, the current player
                    got rewards a point and their turn continue until they find
                    a non-matching pairs.
                  </p>
                  <p className={styles.descrip}>
                    The game end when players have found all the matching pairs.
                    Whoever has higher points win.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
