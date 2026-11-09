import type { JSX } from 'solid-js';

type Props = {
	children?: JSX.Element;
};

export default function UpgradeInfo(props: Props) {
	return <div>{props.children}</div>;
}
