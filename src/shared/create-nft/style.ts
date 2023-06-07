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

export const MainCard = styled.div`
	display: flex;
	flex-direction: row;
	padding: 10px 10px;
`;
export const LeftCard = styled.div`
	width: 50%;
`;
export const AtworkType = styled.div``;
export const AllInput = styled.input<Props>`
	width: 100%;
	height: ${(Props) => (Props.inputWidth ? Props.inputWidth : "56px")};
	padding: 0px 10px;
	outline: none;
	background-color: rgb(255, 251, 245);
	font-size: 16px;
	outline: none;
	border: 1px solid rgb(255, 251, 245);
	border-radius: 10px;
`;
export const ImgInput = styled.input`
	display: none;
`;
export const Title = styled.div``;
export const ArtistName = styled.div``;
export const RightCard = styled.div`
	width: 50%;
	padding: 0px 10px;
`;
export const AtworkImg = styled.div``;
export const ImgCover = styled.div`
	width: 100%;
	height: 275px;
	padding: 0px 10px;
	outline: none;
	background-color: rgb(255, 251, 245);
	font-size: 16px;
	outline: none;
	border: 1px solid rgb(255, 251, 245);
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const Description = styled.div``;
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
