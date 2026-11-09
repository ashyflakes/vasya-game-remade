import 'modern-normalize/modern-normalize.css';
import '@fontsource-variable/inter/index.css';
import './root.css';
import './App.css';

import { createSignal, onCleanup, onMount } from 'solid-js';

import { createGameStore } from '@/game/gameStore.ts';

import styles from './App.module.css';
import VasyaImage from '@/components/VasyaImage/VasyaImage.tsx';
import CatFoodImage from '@/components/CatFoodImage/CatFoodImage.tsx';
import { soundManager } from '@/audio/sfxManager.ts';
import ClickerHeader from '@/layout/Clicker/ClickerHeader/ClickerHeader.tsx';
import StatCard from '@/components/StatCard/StatCard.tsx';
import UpgradeCard from '@/components/UpgradeCard/UpgradeCard.tsx';
import SoundToggle from '@/components/SoundToggle/SoundToggle.tsx';
import UpgradeButton from '@/components/UpgradeButton/UpgradeButton.tsx';
import CatnipImage from '@/components/CatnipImage/CatnipImage.tsx';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal.tsx';

const formatNumber = (value: number) => new Intl.NumberFormat('ru-RU').format(value);

export default function App() {
	const game = createGameStore();

	function handleClick() {
		game.click();

		if (Math.random() < 0.015) {
			soundManager.playFart();
		} else if (Math.random() < 0.1) {
			soundManager.playClick2();
		} else if (Math.random() < 0.1) {
			soundManager.playClick3();
		} else if (Math.random() < 0.1) {
			soundManager.playClick4();
		} else if (Math.random() < 0.1) {
			soundManager.playClick5();
		} else if (Math.random() < 0.1) {
			soundManager.playClick6();
		} else {
			soundManager.playClick();
		}
	}

	function handleClickUpgrade() {
		const purchased = game.buyClickUpgrade();

		if (purchased) {
			soundManager.playUpgrade();
		}
	}

	function handleAutoUpgrade() {
		const purchased = game.buyAutoUpgrade();

		if (purchased) {
			soundManager.playUpgrade();
		}
	}

	function handleCatMintUpgrade() {
		const purchased = game.buyCatMintUpgrade();

		if (purchased) {
			soundManager.playUpgrade();
			soundManager.playCatnip();
			setNow(Date.now()); // сразу пересчитать remaining после установки catMintEndsAt
		}
	}

	onMount(() => {
		let incomeId: number;
		let cancelled = false;

		const tick = () => {
			if (cancelled) return;

			game.addPassiveIncome();

			const delay = game.isCatMintActive() ? 500 : 1000;
			incomeId = window.setTimeout(tick, delay);
		};

		tick();

		// отдельный «часовой» интервал — только для перерисовки catMintRemaining
		const clockId = window.setInterval(() => setNow(Date.now()), 1000);

		onCleanup(() => {
			cancelled = true;
			window.clearTimeout(incomeId);
			window.clearInterval(clockId);
		});
	});

	const [now, setNow] = createSignal(Date.now());

	const catMintRemaining = () =>
		Math.max(0, Math.ceil((game.state.catMintEndsAt - now()) / 1000));

	const catMintActive = () => catMintRemaining() > 0;

	let dialogRef: HTMLDialogElement | undefined;

	return (
		<main class={styles.game}>
			<ClickerHeader />

			<section class={styles.balance}>
				<span>ВАШ БАЛАНС</span>

				<strong>{formatNumber(game.state.currency)}</strong>

				<span>васякойнов</span>
			</section>

			{/* Statistics */}
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

			{/* Click button */}
			<section class={styles.clickArea}>
				<button class={styles.clickButton} type="button" onClick={handleClick}>
					<VasyaImage />
				</button>
			</section>

			{/* Upgrade shop */}
			<section class={styles.shop}>
				<h2>Улучшения</h2>

				<UpgradeCard>
					<CatFoodImage />
					<div>
						<h3>Корм</h3>

						<p>+1 васякойн/клик</p>

						<small>Сила клика: {game.state.clickPower}</small>
					</div>

					<UpgradeButton
						disabled={game.state.currency < game.state.clickUpgradeCost}
						onClick={handleClickUpgrade}
					>
						{game.state.clickUpgradeCost}
					</UpgradeButton>
				</UpgradeCard>

				<UpgradeCard>
					<VasyaImage />
					<div>
						<h3>+1 Вася</h3>

						<p>+1 васякойн/секунду</p>

						<small>Авто-прибыль: {game.state.autoIncome}</small>
					</div>

					<UpgradeButton
						disabled={game.state.currency < game.state.autoUpgradeCost}
						onClick={handleAutoUpgrade}
					>
						{game.state.autoUpgradeCost}
					</UpgradeButton>
				</UpgradeCard>

				<UpgradeCard>
					<CatnipImage />
					<div>
						<h3>Кошачья мята</h3>
						<p>
							X2 ускорение получения васякойнов на {game.state.catMintDuration}{' '}
							секунд.
						</p>
						<small>
							Ускорение:{' '}
							{catMintActive() ? catMintRemaining() : game.state.catMintDuration}с
						</small>
					</div>

					<UpgradeButton
						disabled={
							catMintActive() || game.state.currency < game.state.catMintUpgradeCost
						}
						onClick={handleCatMintUpgrade}
					>
						{catMintActive()
							? `+${catMintRemaining()} с`
							: `${game.state.catMintUpgradeCost}`}
					</UpgradeButton>
				</UpgradeCard>
			</section>

			<SoundToggle />

			<button class={styles.resetButton} type="button" onClick={() => dialogRef?.showModal()}>
				Cброс прогресса
			</button>

			<ConfirmationModal ref={el => (dialogRef = el)} onConfirm={game.reset} />
		</main>
	);
}
