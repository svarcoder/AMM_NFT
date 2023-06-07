import { GridContainer } from "./style";

interface GridProps {
	children?: React.ReactNode;
	show: any;
	setShow: any;
}

export const DropDown = (props: GridProps) => {
	const { children, show, setShow } = props;
	return (
		<GridContainer
			show={show}
			onMouseOver={() => setShow(true)}
			onMouseOut={() => setShow(false)}>
			{children}
		</GridContainer>
	);
};
