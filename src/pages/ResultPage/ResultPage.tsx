import PageLayout from "../../components/PageLayout/PageLayout";
import ResultTable from "../../components/ResultTable/ResultTable";

/**
 * Компонент ResultPage для відображення сторінки результатів гри в судоку, включаючи таблицю результатів.
 * @returns {any}
 */
const ResultPage = () => {
  return (
    <PageLayout>
      <h2>Game Results</h2>
      <ResultTable />
    </PageLayout>
  );
};

export default ResultPage;
