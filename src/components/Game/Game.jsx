import { useState, useEffect } from "react";
import Board from "../Board/Board.jsx";
import Scoreboard from "../Scoreboard/Scoreboard.jsx";
import calculateWinner from "../../utils/calculateWinner.js";
import styles from "./Game.module.css";

export default function Game() {
  // Gerenciamento de estado do tabuleiro
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  // Gerenciamento de estado do placar
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [draws, setDraws] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // Verifica vitória ou empate
  useEffect(() => {
    const winner = calculateWinner(currentSquares);

    let isFull = true;

    for (let i = 0; i < currentSquares.length; i++) {
      if (currentSquares[i] === null) {
        isFull = false;
        break;
      }
    }

    if (winner === "X") {
      setScoreX((prevScore) => prevScore + 1);
    } else if (winner === "O") {
      setScoreO((prevScore) => prevScore + 1);
    } else if (isFull) {
      setDraws((prevDraws) => prevDraws + 1);
    }
  }, [currentMove]);

  // Realiza uma jogada
  function handlePlay(nextSquares) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      nextSquares,
    ];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // Reinicia APENAS o tabuleiro da partida atual
  function handleRestartGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  // Reinicia o tabuleiro E ZERA o placar acumulado
  function handleResetAll() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setScoreX(0);
    setScoreO(0);
    setDraws(0);
  }

  return (
    <div className={styles["game-board"]}>
      <Scoreboard
        scoreX={scoreX}
        scoreO={scoreO}
        draws={draws}
      />

      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>

      <div className={styles["game-actions"]}>
        <button
          className={styles["restart-button"]}
          onClick={handleRestartGame}
        >
          Reiniciar Jogo
        </button>

        <button
          className={styles["reset-all-button"]}
          onClick={handleResetAll}
        >
          Zerar Placar e Jogo
        </button>
      </div>
    </div>
  );
}