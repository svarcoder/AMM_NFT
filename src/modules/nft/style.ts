import styled from "styled-components";

interface Props {
	active?: any;
	show?: any;
}
export const Main = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const Center = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const SubmitButton = styled.button`
	padding: 10px;
	border-radius: 20px;
	opacity: 0.5;
	cursor: pointer;
	box-shadow: none;
	background-color: rgb(255, 104, 113);
	border: 1px solid rgb(255, 104, 113);
	margin: 10px;
`;
export const SaleNFT = styled.button<Props>`
	padding: 10px;
	border-radius: 20px;
	opacity: 0.5;
	cursor: pointer;
	box-shadow: none;
	background-color: ${(props) =>
		props.active === true ? "gray" : "rgb(255, 104, 113)"};
	border: 1px solid rgb(255, 104, 113);
	margin: 10px;
	transition: all linear 0.5s;
	&:hover {
		color: #ffff;
		opacity: 0.8;
		box-shadow: 5px 5px #ebda86;
	}
	@media only screen and (min-width: 480px) {
		font-size: 8px;
		padding: 10px 10px;
	}
	@media only screen and (min-width: 768px) {
		font-size: 12px;
		padding: 15px 15px;
	}
	@media only screen and (min-width: 1024px) {
		font-size: 16px;
		padding: 20px 20px;
	}
`;
