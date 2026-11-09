import styles from './ClickerStats.module.css';
import { createGameStore } from '@/game/gameStore.ts';
import StatCard from '@/components/StatCard/StatCard.tsx';

export default function ClickerStats() {
	const formatNumber = (value: number) => new Intl.NumberFormat('ru-RU').format(value);
	const game = createGameStore();

	return (
		<section class={styles.stats}>
			<StatCard>
				<span>за клик</span>
				<strong>{game.state.clickPower}</strong>
			</StatCard>

			<StatCard>
				<span>за секунду</span>
				<strong>{game.state.autoIncome}</strong>
			</StatCard>

			<StatCard>
				<span>всего кликов</span>
				<strong>{formatNumber(game.state.totalClicks)}</strong>
			</StatCard>
		</section>
	);
}
