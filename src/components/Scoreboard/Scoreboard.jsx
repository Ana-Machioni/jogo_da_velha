import styles from './Scoreboard.module.css';

// Componente simples que apenas recebe e exibe o placar
export default function Scoreboard({ scoreX, scoreO, draws }) {
  return (
    <section className={styles.scoreboard}>
      <div className={styles.scoreboard__item}>
        <span className={styles.scoreboard__label}>Jogador X</span>
        <span className={styles.scoreboard__value}>{scoreX}</span>
      </div>

      <div className={styles.scoreboard__item}>
        <span className={styles.scoreboard__label}>Empates</span>
        <span className={styles.scoreboard__value}>{draws}</span>
      </div>

      <div className={styles.scoreboard__item}>
        <span className={styles.scoreboard__label}>Jogador O</span>
        <span className={styles.scoreboard__value}>{scoreO}</span>
      </div>
    </section>
  );
}