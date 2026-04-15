import styles from "./SudokuCell.module.css";

type SudokuCellProps = {
  value?: string;
  variant?: "fixed" | "editable";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  isSelected?: boolean;
};

/**
 * Компонент SudokuCell для відображення окремої клітинки судоку.
 * @param {any} {value=""
 * @param {any} variant="editable"
 * @param {any} onChange
 * @param {any} onClick
 * @param {any} isSelected=false
 * @param {any} }:SudokuCellProps
 * @returns {any}
 */
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
