import styled from "styled-components";

export const SharedTitle = styled.div`
	font-size: 15px;
	overflow-wrap: normal;
	font-weight: 100;
	margin: 5px 0;
	@media only screen and (min-width: 480px) {
		font-size: 20px;
	}
	@media only screen and (min-width: 768px) {
		font-size: 25px;
	}
	@media only screen and (min-width: 1024px) {
		font-size: 30px;
	}
`;

export const SharedDescription = styled.p`
	font-size: 5px;
	overflow-wrap: normal;
	font-weight: 100;
	@media only screen and (min-width: 480px) {
		font-size: 10px;
	}
	@media only screen and (min-width: 768px) {
		font-size: 12px;
	}
	@media only screen and (min-width: 1024px) {
		font-size: 16px;
	}
`;

export const SharedButton = styled.button`
	font-size: 10px;
	text-decoration: none;
	color: #ffff;
	padding: 5px 5px;
	margin: 10px 0;
	background-color: transparent;
	border: 2px solid #455757;
	transition: all linear 0.5s;
	cursor: pointer;
	&:hover {
		color: #ffff;
		opacity: 0.8;
		box-shadow: 5px 5px #ebda86;
	}
	@media only screen and (min-width: 480px) {
		font-size: 20px;
	}
	@media only screen and (min-width: 768px) {
		font-size: 25px;
	}
	@media only screen and (min-width: 1024px) {
		font-size: 30px;
	}
`;

export const SharedDetailBlock = styled.div`
	color: #ffff;
	display: flex;
	flex-direction: column;
	align-items: center;
	.title {
		font-size: 48px;
		font-weight: 700;
	}
	.description {
		font-size: 14px;
		margin: 5px 0;
		font-weight: 700;
	}
`;

export const SharedForum = styled.div`
	border: 1px solid #ffff;
	padding: 10px 25px;
	font-weight: 300;
	font-size: 24px;
	border-radius: 8px;
`;
