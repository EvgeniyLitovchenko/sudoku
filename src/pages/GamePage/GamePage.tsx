import PageLayout from "../../components/PageLayout/PageLayout";
import GameBoard from "../../components/GameBoard/GameBoard";
import SudokuCell from "../../components/SudokuCell/SudokuCell";

const GamePage = () => {
  return (
    <PageLayout>
      <GameBoard>

        {Array.from({ length: 81 }).map((_, index) => (
            <SudokuCell
            key={index}
            variant={index % 5 === 0 ? "fixed" : "editable"}
            value={index % 5 === 0 ? "5" : ""}
            />
        ))}

      </GameBoard>
    </PageLayout>
  );
};

export default GamePage;
