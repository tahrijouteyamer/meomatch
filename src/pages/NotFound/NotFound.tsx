import { redirect, useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";
import Tilt from "react-parallax-tilt";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={"g-container " + styles.container}>
        <CardReveal />
      </div>
    </div>
  );
}

function CardReveal() {
  const navigate = useNavigate();
  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.1}
      glareColor="#ffffff"
      glarePosition="all"
      glareBorderRadius="20px"
      tiltReverse={true}
    >
      <div
        className={styles.card}
        onClick={() => {
          navigate("/");
        }}
      >
        <div className={styles.innerCont}>
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>Click to go back to game</p>
        </div>
      </div>
    </Tilt>
  );
}
