import styles from './StatCard.module.css';
import type { JSX } from 'solid-js';

type Props = {
	children?: JSX.Element;
};

export default function StatCard(props: Props) {
	return <div class={styles.statsContainer}>{props.children}</div>;
}
