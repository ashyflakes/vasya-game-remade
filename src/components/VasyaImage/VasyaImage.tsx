import vasya from './vasya.webp';
import vasyaSecondary from './vasya-2.webp';

type Props = {
	variant?: 'default' | 'secondary';
};

export default function VasyaImage(props: Props) {
	return (
		<img
			src={props.variant == 'secondary' ? vasyaSecondary : vasya}
			alt="вася"
			class="vasya"
			height="64px"
			width="64px"
		/>
	);
}
