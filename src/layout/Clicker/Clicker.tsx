import styles from './Clicker.module.css';
import ClickerButtonArea from '@/layout/Clicker/ClickerButtonArea/ClickerButtonArea.tsx';
import ClickerStats from '@/layout/Clicker/ClickerStats/ClickerStats.tsx';
import UpgradeShop from '@/components/UpgradeShop/UpgradeShop.tsx';
import ResetProgressButton from '@/components/ResetProgressButton/ResetProgressButton.tsx';
import SoundToggle from '@/components/SoundToggle/SoundToggle.tsx';
import ClickerHeader from '@/layout/Clicker/ClickerHeader/ClickerHeader.tsx';
import ClickerCurrency from '@/layout/Clicker/ClickerCurrency/ClickerCurrency.tsx';

export default function Clicker() {
	return (
		<main class={styles.game}>
			<ClickerHeader />
			<ClickerCurrency />

			<ClickerButtonArea />
			<ClickerStats />

			<UpgradeShop />

			<SoundToggle />
			<ResetProgressButton />
		</main>
	);
}
