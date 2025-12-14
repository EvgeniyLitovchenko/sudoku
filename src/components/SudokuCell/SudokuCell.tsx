import styles from "./SudokuCell.module.css";

type SudokuCellProps = {
  value?: string;
  variant?: "fixed" | "editable";
};

const SudokuCell = ({
  value = "",
  variant = "editable",
}: SudokuCellProps) => {
  const isFixed = variant === "fixed";

  return (
    <div className={styles.cell}>
      <input
        className={`${styles.input} ${isFixed ? styles.fixed : ""}`}
        value={value}
        readOnly={isFixed}
        placeholder={isFixed ? undefined : ""}
      />
    </div>
  );
};

export default SudokuCell;
