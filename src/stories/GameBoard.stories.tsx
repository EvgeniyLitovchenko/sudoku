import type { Meta, StoryObj } from "@storybook/react";
import GameBoard from "../components/GameBoard/GameBoard";
import SudokuCell from "../components/SudokuCell/SudokuCell";

const meta: Meta<typeof GameBoard> = {
  title: "Sudoku/GameBoard",
  component: GameBoard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof GameBoard>;

const createBoard = (size: number) => {
  return Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => (
      <SudokuCell
        key={`${row}-${col}`}
        value={(row + col) % 9 === 0 ? "9" : ""}
        variant={(row + col) % 7 === 0 ? "fixed" : "editable"}
      />
    )),
  );
};

export const Small4x4: Story = {
  args: {
    size: 4,
    children: createBoard(4),
  },
};

export const Classic9x9: Story = {
  args: {
    size: 9,
    children: createBoard(9),
  },
};

export const EmptyBoard: Story = {
  args: {
    size: 9,
    children: Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => (
        <SudokuCell value="" variant="editable" />
      )),
    ),
  },
};
