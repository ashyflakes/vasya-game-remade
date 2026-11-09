import styles from './ResetProgressButton.module.css';
import { createGameStore } from '@/game/gameStore.ts';

export default function ResetProgressButton() {
	const game = createGameStore();

	return (
		<button class={styles.resetButton} type="button" onClick={game.reset}>
			Сброс прогресса
		</button>
	);
}
