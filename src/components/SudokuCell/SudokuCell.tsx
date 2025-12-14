import styles from "./SudokuCell.module.css";

type SudokuCellProps = {
  value?: string;
  variant?: "fixed" | "editable";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  isSelected?: boolean;
};

const SudokuCell = ({
  value = "",
  variant = "editable",
  onChange,
  onClick,
  isSelected = false,
}: SudokuCellProps) => {
  const isFixed = variant === "fixed";

  return (
    <div
      className={`${styles.cell} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <input
        className={`${styles.input} ${isFixed ? styles.fixed : ""}`}
        value={value}
        readOnly={isFixed}
        placeholder={isFixed ? undefined : ""}
        onChange={onChange}
      />
    </div>
  );
};

export default SudokuCell;
