import { useEffect } from "react";
import Swal from "sweetalert2"; 
import Square from "../Square/Square.jsx";
import styles from "./Board.module.css";
import calculateWinner  from "../../utils/calculateWinner.js";


export default function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  
  const isDraw = squares.every((square) => square !== null) && !winner;

  useEffect(() => {
    if (isDraw) {
      Swal.fire({
        title: 'Deu Velha! ',
        text: 'Ninguém venceu esta rodada.',
        icon: 'info',
        confirmButtonText: 'Tentar Novamente',
      });
    }
  }, [isDraw]);

  let status;
  if (winner) {
    status = 'Ganhador ' + winner;
  } else {
    status = 'Proximo jogador ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className={styles.status}>{status}</div>

      <div className={styles.board}></div>
      <div className={styles.boardRow}>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className={styles.boardRow}>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className={styles.boardRow}>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );

}