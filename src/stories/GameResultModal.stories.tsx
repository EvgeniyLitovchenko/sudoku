import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import GameResultModal from "../components/GameResultModal/GameResultModal";

const meta: Meta<typeof GameResultModal> = {
  title: "Sudoku/GameResultModal",
  component: GameResultModal,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof GameResultModal>;

const Wrapper = (args: any) => {
  const [open, setOpen] = useState(true);

  return (
    <GameResultModal
      {...args}
      isOpen={open}
      onRestart={() => setOpen(false)}
      onNext={() => alert("Next game")}
      onContinue={() => alert("Continue game")}
    />
  );
};

export const Win: Story = {
  render: () =>
    Wrapper({
      win: true,
      time: 320,
      difficulty: "Easy",
      attemptsLeft: null,
    }),
};

export const Lose: Story = {
  render: () =>
    Wrapper({
      win: false,
      time: 540,
      difficulty: "Hard",
      attemptsLeft: 0,
    }),
};

export const Continue: Story = {
  render: () =>
    Wrapper({
      win: false,
      time: 120,
      difficulty: "Medium",
      attemptsLeft: 2,
    }),
};
