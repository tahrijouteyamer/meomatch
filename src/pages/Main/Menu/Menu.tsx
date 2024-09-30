import MoonSVG from "../../../SVG/MoonSVG";
import SunSVG from "../../../SVG/SunSVG";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import useStore from "../../../store/store";
import styles from "./Menu.module.css";

export default function Menu() {
  const newGame = useStore((state) => state.newGame);
  const gameMode = useStore((state) => state.currentGameMode);
  const setMenuOpen = useStore((state) => state.setMenuOpen);

  const theme = useStore((state) => state.currentTheme);

  return (
    <>
      <Modal>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.innerCont}>
              <div className={styles.btnCont}>
                <Button
                  onClickCB={() => {
                    newGame(gameMode);
                    setMenuOpen(false);
                  }}
                  title="New Game"
                  variants="secondary"
                />
                <Button
                  onClickCB={() => {
                    newGame(gameMode === "multi" ? "single" : "multi");
                    setMenuOpen(false);
                  }}
                  variants="secondary"
                  title={gameMode === "multi" ? "Single Player" : "Multiplayer"}
                />
              </div>

              <div className={styles.colorPickerCont}>
                <div
                  className={styles.colorPicker}
                  data-color="moon"
                  data-active={theme.isDarkMode}
                  onClick={() => {
                    theme.enable();
                  }}
                >
                  <MoonSVG color="white" />
                </div>

                <div
                  className={styles.colorPicker}
                  data-color="sun"
                  data-active={!theme.isDarkMode}
                  onClick={() => {
                    theme.disable();
                  }}
                >
                  <SunSVG color="#0f0f0f" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
