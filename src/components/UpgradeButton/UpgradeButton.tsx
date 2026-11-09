import type { JSX } from 'solid-js';
import styles from './UpgradeButton.module.css';

type Props = {
	children?: JSX.Element;
	disabled?: any;
	onClick?: any;
};

export default function UpgradeButton(props: Props) {
	return (
		<button
			type="button"
			disabled={props.disabled}
			onClick={props.onClick}
			class={styles.upgrade__button}
		>
			<span>{props.children}</span>
		</button>
	);
}
