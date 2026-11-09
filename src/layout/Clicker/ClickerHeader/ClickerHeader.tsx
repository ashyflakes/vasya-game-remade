import styles from './ClickerHeader.module.css';

export default function ClickerHeader() {
	return (
		<header class={styles.header}>
			<h1>Вася (Кликер)</h1>
			<p>Простейшая игра</p>
		</header>
	);
}
