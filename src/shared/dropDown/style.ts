import styled from "styled-components";

interface Props {
	show: any;
}

export const GridContainer = styled.div<Props>`
	display: ${(props) => (props.show ? "block" : "none")};
	position: absolute;
	z-index: 1;
	top: 22px;
	min-width: 50px;
	min-height: auto;
	padding: 0px 6px;
	border: 1px solid gray;
	left: 0;
	background-color: #d7dbd8;
	color: black;
	border-radius: 5px;
	box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);

	@media only screen and (min-width: 480px) {
		top: 35px;
	}
	@media only screen and (min-width: 768px) {
		top: 55px;
	}
	@media only screen and (min-width: 1024px) {
		top: 70px;
	}
`;
