import styled, { css } from "styled-components";

export const CardWrapper = styled.div`
	padding: 10px 10px;
	margin: 48px auto 0;
	width: 300px;
	font-family: Quicksand, arial, sans-serif;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
	border-radius: 5px;
	background-color: #ffffff;
`;

export const CardHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const LeftHead = styled.h1`
	padding: 10px 10px;
	font-size: 24px;
	font-weight: bold;
`;
export const RightHead = styled.h1`
	padding: 10px 10px;
	font-size: 24px;
	font-weight: bold;
`;

export const CardBody = styled.div`
	padding: 10px 10px;
	border: none;
`;

export const CardImg = styled.div`
	height: 200px;
	width: 100%;
	img {
		height: 100%;
		width: 100%;
	}
`;
export const CardFooter = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
export const LeftFoot = styled.div`
	padding: 10px 0px;
	font-size: 24px;
	font-weight: bold;
`;
export const RightFoot = styled.div`
	padding: 10px 0px;
	font-size: 24px;
	font-weight: bold;
`;
export const CardButton = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const BurnButton = styled.div`
	padding: 10px;
	border-radius: 20px;
	opacity: 0.5;
	cursor: pointer;
	box-shadow: none;
	background-color: rgb(255, 104, 113);
	border: 1px solid rgb(255, 104, 113);
`;
export const BuyButton = styled(BurnButton)``;
