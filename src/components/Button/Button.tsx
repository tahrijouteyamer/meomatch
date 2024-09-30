import styles from "./Button.module.css";

type Props = {
  onClickCB: () => void;
  title: string;
  variants?: "primary" | "secondary";
};

export default function Button({
  onClickCB,
  title = "Test",
  variants = "primary",
}: Props) {
  return (
    <button
      className={styles.container}
      onClick={onClickCB}
      data-variants={variants}
    >
      {title}
    </button>
  );
}
