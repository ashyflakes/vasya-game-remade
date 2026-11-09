import styles from './UpgradeCard.module.css';
import type { JSX } from 'solid-js';

type Props = {
	children?: JSX.Element;
};

export default function UpgradeCard(props: Props) {
	return <article class={styles.upgradeCard}>{props.children}</article>;
}
