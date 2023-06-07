import styled from "styled-components";
import { imageUrl } from "../../../shared/utility";

export const HomeContainer = styled.div`
	color: #ffff;
	height: 100%;
	width: 100%;
	padding: 20px 30px;
`;
export const MoonComponent = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
`;
export const MoonLeft = styled.section`
	/* margin: 100px 30px;
	padding-right: 85px;
	.headings {
		font-size: 40px;
		text-transform: uppercase;
		overflow-wrap: normal;
		font-weight: 400;
		cursor: pointer;
		color: #ffff;
	} */
`;
export const MoonRight = styled.section`
	/* max-width: 60%;
	margin: 0 auto; */
	padding: 15px 5px;
`;

export const MoonLogo = styled.div`
	width: 50px;
	height: 45px;
	cursor: pointer;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	@media only screen and (min-width: 480px) {
		width: 100px;
		height: 95px;
	}
	@media only screen and (min-width: 768px) {
		width: 150px;
		height: 145px;
	}
	@media only screen and (min-width: 1024px) {
		width: 200px;
		height: 195px;
	}
`;

export const TotalCardComponent = styled.div`
	@media only screen and (min-width: 480px) {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
`;

export const CardComponent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 10px 0px;
`;

export const TotalGridComponent = styled.div``;
export const GridRowLeft = styled.div`
	display: grid;
	grid-template-rows: 1fr auto;
	gap: 16px;
	height: 100%;
`;
export const GridRowRight = styled.div`
	max-width: 375px;
	.block {
		grid-row: span 2;
		border: 1px solid #ffff;
		border-radius: 8px;
		min-height: 100%;
		background-color: #ffff;
	}
`;
export const GR_First = styled.div`
	padding: 0 30px;
	display: flex;
	flex-flow: column wrap;
	justify-content: flex-end;
	align-items: flex-start;
	border: 1px solid #ffff;
	border-radius: 8px;
	position: relative;
	::before {
		content: "";
		position: absolute;
		z-index: -1;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		opacity: 0.5;
		background: url(${imageUrl}) no-repeat center;
		background-size: cover;
	}
	.subHeading {
		max-width: 360px;
		font-size: 32px;
	}
	.descriptions {
		max-width: 360px;
		line-height: 140%;
		font-weight: 200;
		font-size: 20px;
		opacity: 0.8;
		color: rgb(136, 141, 155);
	}
`;

export const GR_Second = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 10px;
	.block {
		color: #ffff;
		border-radius: 8px;
		font-weight: 400px;
		font-size: 36px;
		border: 1px solid #ffff;
		padding: 10px 25px;
	}
`;

export const ForumStyle = styled.div`
	display: grid;
	margin: 20px 0;
	grid-template-columns: 1fr 1fr;
	column-gap: 30px;
	.left {
		grid-row: span 3;
		border: 1px solid #ffff;
		background: rgb(0 0 0 / 40%);
		border-radius: 8px;
	}
	.right {
		display: grid;
		grid-template-rows: auto auto auto;
		row-gap: 10px;
	}
`;
