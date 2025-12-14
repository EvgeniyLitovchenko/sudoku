import styles from "./ResultTable.module.css";

type Result = {
  gameId: string;
  leftTime: string;
  status: "win" | "lose";
};

type ResultTableProps = {
  results?: Result[];
};

const ResultTable = ({ results }: ResultTableProps) => {
  const mockResults: Result[] = results ?? [
    { gameId: "001", leftTime: "02:15", status: "win" },
    { gameId: "002", leftTime: "00:00", status: "lose" },
    { gameId: "003", leftTime: "01:04", status: "win" },
  ];

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Game ID</th>
          <th>Time left</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        {mockResults.map((result) => (
          <tr key={result.gameId}>
            <td>{result.gameId}</td>
            <td>{result.leftTime}</td>
            <td
              className={
                result.status === "win" ? styles.win : styles.lose
              }
            >
              {result.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultTable;
