import { useState, useEffect } from "react";
import Board from "../Board/Board.jsx";
import Square from "../Square/Square.jsx";
import Scoreboard from "../Scoreboard/Scoreboard.jsx";
import calculateWinner from "../../utils/calculateWinner.js";

export default function Game() {
  // Gerenciamento de estado do tabuleiro e histórico de jogadas
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  // Gerenciamento de estado do placar
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [draws, setDraws] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // Efeito reativo para verificar vitória ou empate a cada movimento atualizado
  useEffect(() => {
    const winner = calculateWinner(currentSquares);

    // Loop tradicional para verificar se todas as posições estão preenchidas
    let isFull = true;
    for (let i = 0; i < currentSquares.length; i++) {
      if (currentSquares[i] === null) {
        isFull = false;
        break;
      }
    }

    // Atualização funcional do placar dependendo do resultado
    if (winner === 'X') {
      setScoreX((prevScore) => prevScore + 1);
    } else if (winner === 'O') {
      setScoreO((prevScore) => prevScore + 1);
    } else if (isFull) {
      setDraws((prevDraws) => prevDraws + 1);
    }
  }, [currentMove]);

  // Função disparada ao realizar uma jogada válida
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // Função para navegar pelo histórico do jogo ("viagem no tempo")
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Jogada #' + move;
    } else {
      description = 'Reiniciar';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <Scoreboard scoreX={scoreX} scoreO={scoreO} draws={draws} />
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
