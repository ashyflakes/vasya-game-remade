import styles from './ConfirmationModal.module.css';

type Props = {
	ref?: (el: HTMLDialogElement) => void;
	onConfirm: () => void;
	onCancel?: () => void;
};

export default function ConfirmationModal(props: Props) {
	let dialogRef: HTMLDialogElement | undefined;

	return (
		<dialog
			class={styles.confirmationModal}
			ref={el => {
				dialogRef = el;
				props.ref?.(el);
			}}
			onClose={() => props.onCancel?.()}
		>
			<div class={styles.confirmationModal}>
				<div class={styles.confirmationModalHeader}>
					<h1>Вы уверены, что хотите сбросить прогресс?</h1>
					<p>Вы потеряете его навсегда.</p>
				</div>
				<div class={styles.confirmationModalButtons}>
					<button
						type="button"
						onClick={() => {
							props.onConfirm();
							dialogRef?.close();
						}}
						class={styles.resetButton}
					>
						Сбросить
					</button>
					<button
						type="button"
						onClick={() => dialogRef?.close()}
						class={styles.cancelButton}
					>
						Отменить
					</button>
				</div>
			</div>
		</dialog>
	);
}
