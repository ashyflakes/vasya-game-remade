import styles from './VasyaClickButton.module.css';
import VasyaImage from '@/components/VasyaImage/VasyaImage.tsx';
import { createGameStore } from '@/game/gameStore.ts';
import { soundManager } from '@/audio/sfxManager.ts';

export default function VasyaClickButton() {
	const game = createGameStore();

	const handleClick = () => {
		game.click();
		soundManager.playClick();
	};

	return (
		<button class={styles.clickButton} type="button" onClick={handleClick}>
			<VasyaImage />
		</button>
	);
}
