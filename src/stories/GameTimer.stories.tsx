import type { Meta, StoryObj } from "@storybook/react";
import GameTimer from "../components/GameTimer/GameTimer";

const meta: Meta<typeof GameTimer> = {
  title: "Sudoku/GameTimer",
  component: GameTimer,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof GameTimer>;

export const Default: Story = {
  args: {
    time: "00:00",
  },
};

export const Running: Story = {
  args: {
    time: "03:42",
  },
};

export const AlmostFinished: Story = {
  args: {
    time: "59:59",
  },
};
