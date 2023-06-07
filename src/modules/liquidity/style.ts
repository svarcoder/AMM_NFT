import styled from "styled-components";

interface Props {
	active?: any;
	show?: any;
}
export const Main = styled.div`
	display: flex;
	justify-content: center;
`;
export const LiquidityPool = styled.div`
	max-width: 420px;
	width: 100%;
	background: rgb(255, 253, 250);
	box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
		rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
	border-radius: 20px;
	padding: 1rem;
	margin: 40px 0px;
`;
export const Card = styled.div`
	display: flex;
	flex-direction: column;
`;
export const CardTitle = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`;
export const Button = styled.div<Props>`
	background: ${(props) => (props.active === true ? "orange" : "gray")};
	box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
		rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
	border-radius: 10px;
	padding: 0.5rem;
	margin: 0px 10px;
	cursor: pointer;
`;
export const CardDescription = styled.div``;
export const AllInput = styled.div`
	padding: 10px;
	border-radius: 20px;
	background-color: rgb(255, 249, 240);
	margin: 10px;
`;
export const Input = styled.input`
	width: 100%;
	outline: none;
	border: none;
	background-color: rgb(255, 249, 240);
`;
export const TInput = styled.input`
	width: 25%;
	outline: none;
	border: none;
	background-color: rgb(255, 249, 240);
`;
export const Title = styled.div`
	display: flex;
	justify-content: space-between;
`;
export const PlsButton = styled.div`
	display: flex;
	justify-content: center;
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
export const PercentComponent = styled.div`
	display: flex;
	justify-content: center;
	padding: 10px;
`;
export const PButton = styled.div<Props>`
	margin: 5px;
	padding: 5px 10px;
	border: 1px solid rgb(238, 217, 204);
	background-color: ${(props) =>
		props.show === true ? "rgb(238, 217, 204)" : "rgb(114, 47, 13)"};
	border-radius: 10px;
	cursor: pointer;
`;
export const PolledComponent = styled.div`
	display: flex;
	flex-direction: column;
`;
export const PollTitle = styled.div`
	display: flex;
	justify-content: center;
	color: rebeccapurple;
`;
export const PollEl = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
export const Price = styled.div`
	padding: 10px;
	display: flex;

	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
export const BUST = styled.div``;
