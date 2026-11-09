import catnip from './catnip.webp';
import styles from './Catnip.module.css';

export default function CatnipImage() {
	return <img src={catnip} alt="кошачья мята" height="24px" width="24px" class={styles.catnip} />;
}
