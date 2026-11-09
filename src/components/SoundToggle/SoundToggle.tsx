import { createSignal } from 'solid-js';
import { soundManager } from '@/audio/sfxManager.ts';

import styles from './SoundToggle.module.css';

export default function SoundToggle() {
	const [soundEnabled, setSoundEnabled] = createSignal(true);

	const toggleSound = () => {
		const nextValue = !soundEnabled();

		setSoundEnabled(nextValue);
		soundManager.setMuted(!nextValue);
	};

	return (
		<button
			type="button"
			aria-pressed={soundEnabled()}
			onClick={toggleSound}
			class={styles.soundToggle}
		>
			<span>{soundEnabled() ? 'звук: вкл.' : 'звук: выкл.'}</span>
		</button>
	);
}
