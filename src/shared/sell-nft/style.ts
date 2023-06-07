import styled, { keyframes } from "styled-components";
interface Props {
	inputWidth?: any;
}
export const Content = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ConnectButtonWrap = styled.div`
	padding: 10px;
	border-radius: 20px;
	opacity: 0.5;
	cursor: pointer;
	box-shadow: none;
	background-color: rgb(255, 104, 113);
	border: 1px solid rgb(255, 104, 113);
	margin-left: 10px;
`;

export const MainCard = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px 10px;
`;
export const Center = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px 10px;
`;

export const Mint = styled.button`
	background-color: rgb(194, 122, 79);
	color: rgb(225, 182, 151);
	cursor: pointer;
	box-shadow: none;
	border: 1px solid rgb(194, 122, 79);
	outline: none;
	border-radius: 10px;
	width: 100px;
`;

export const AllInput = styled.input`
	width: 100%;
	height: 56px;
	padding: 0px 10px;
	outline: none;
	background-color: rgb(255, 251, 245);
	font-size: 16px;
	outline: none;
	border: 1px solid rgb(255, 251, 245);
	border-radius: 10px;
`;
