import UpgradeCard from '@/components/UpgradeCard/UpgradeCard.tsx';
import CatFoodImage from '@/components/CatFoodImage/CatFoodImage.tsx';
import UpgradeInfo from '@/components/UpgradeCard/UpgradeInfo/UpgradeInfo.tsx';
import UpgradeButton from '@/components/UpgradeButton/UpgradeButton.tsx';
import VasyaImage from '@/components/VasyaImage/VasyaImage.tsx';
import { createGameStore } from '@/game/gameStore.ts';
import styles from './UpgradeShop.module.css';

export default function UpgradeShop() {
	const game = createGameStore();

	return (
		<section class={styles.shop}>
			<h2>Улучшения</h2>

			<UpgradeCard>
				<CatFoodImage />
				<UpgradeInfo>
					<h3>Корм</h3>
					<p>+1 васякойн/клик</p>
					<small>Сила: {game.state.clickPower}</small>
				</UpgradeInfo>

				<UpgradeButton>+ {game.state.clickUpgradeCost}</UpgradeButton>
			</UpgradeCard>

			<UpgradeCard>
				<VasyaImage />
				<UpgradeInfo>
					<h3>+1 Вася</h3>
					<p>+1 васякойн/секунду</p>
					<small>Прибыль: {game.state.autoIncome}</small>
				</UpgradeInfo>
				<UpgradeButton>+ {game.state.clickUpgradeCost}</UpgradeButton>
			</UpgradeCard>
		</section>
	);
}
