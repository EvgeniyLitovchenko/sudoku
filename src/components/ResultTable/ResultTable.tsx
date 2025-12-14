import { useEffect, useState } from "react";
import styles from "./ResultTable.module.css";
import { useFixResult } from "../../hooks/useFixResult";
import type { GameResult } from "../../hooks/useFixResult";

type ResultTableProps = {};

const ResultTable = ({}: ResultTableProps) => {
  const { getResults } = useFixResult();
  const [results, setResults] = useState<GameResult[]>([]);

  useEffect(() => {
    const savedResults = getResults();
    setResults(savedResults.reverse());
  }, [getResults]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Difficulty</th>
          <th>Time</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result, index) => (
          <tr key={index}>
            <td>{new Date(result.date).toLocaleString()}</td>
            <td>{result.difficulty}</td>
            <td>{formatTime(result.time)}</td>
            <td className={result.win ? styles.win : styles.lose}>
              {result.win ? "win" : "lose"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultTable;
