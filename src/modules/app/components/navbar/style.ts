import styled from "styled-components";

export const HeaderContainer = styled.header`
	padding: 15px 10px;
	position: sticky;
	top: 0;
	backdrop-filter: blur(8px);
	background: rgb(9 34 39 / 50%);
`;
export const LogoContainer = styled.div`
	width: 50px;
	height: 45px;
	cursor: pointer;
	display: flex;
	flex-direction: row;
	img {
		/* width: 100%;
		height: 100%; */
		object-fit: cover;
	}
	@media only screen and (min-width: 480px) {
		width: 50px;
		height: 45px;
	}
	@media only screen and (min-width: 768px) {
		width: 60px;
		height: 55px;
	}
	@media only screen and (min-width: 1024px) {
		width: 70px;
		height: 65px;
	}
`;
export const Navigations = styled.nav`
	display: flex;
	align-items: center;

	a {
		position: relative;
		cursor: pointer;
		font-size: 5px;
		text-decoration: none;
		color: #ffff;
		padding: 5px 5px;
		margin: 0 5px;
		border: 2px solid #455757;
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
	}
`;
