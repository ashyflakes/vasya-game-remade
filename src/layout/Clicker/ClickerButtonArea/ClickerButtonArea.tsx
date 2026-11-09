import styles from './ClickerButtonArea.module.css';
import VasyaClickButton from '@/components/VasyaClickButton/VasyaClickButton.tsx';

export default function ClickerButtonArea() {
	return (
		<section class={styles.clickArea}>
			<VasyaClickButton />
		</section>
	);
}
