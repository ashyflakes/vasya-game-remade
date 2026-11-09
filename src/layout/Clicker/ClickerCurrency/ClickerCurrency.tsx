import styles from './ClickerCurrency.module.css';
import { createGameStore } from '@/game/gameStore.ts';

export default function ClickerCurrency() {
	const formatNumber = (value: number) => new Intl.NumberFormat('ru-RU').format(value);
	const game = createGameStore();

	return (
		<section class={styles.balance}>
			<span>ВАШ БАЛАНС</span>

			<strong>{formatNumber(game.state.currency)}</strong>

			<span>васякойнов</span>
		</section>
	);
}
