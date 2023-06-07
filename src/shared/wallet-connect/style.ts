import styled, { keyframes } from "styled-components";

export const Content = styled.div``;
// export const SemiHead = styled.p`
// 	font-size: 12px;
// 	line-height: 19px;
// 	font-family: Light;
// 	margin: 0;
// 	color: white;
// 	@media (min-width: 481px) {
// 		font-size: 16px;
// 	}
// `;
export const AddressInfoWrap = styled.div`
	display: flex;
	justify-content: center;
`;
export const ConnectButtonWrap = styled.div`
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
`;
export const BnbInfo = styled.div`
	color: white;
	font-size: 12px;
	line-height: 19px;
	font-family: SemiBold;
	background: #666664;
	border-radius: 4px;
	padding: 12px 50px 9px 25px;
	height: 23px;
	@media (min-width: 481px) {
		font-size: 12px;
		padding: 12px 50px 9px 15px;
	}
	@media (min-width: 481px) {
		font-size: 16px;
		padding: 12px 50px 9px 25px;
	}
`;

export const AddressInfo = styled.div`
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
`;

export const OptionArea = styled.div`
	border-radius: 0px;
	margin-bottom: 25px;
`;

export const WalletOption = styled.div`
	background: rgba(204, 204, 204, 0.1);
	border-radius: 0px;
	// border: 0.5px solid rgba(204, 204, 204, 0.1);
	margin-bottom: 15px;
	z-index: 0;
	transition: all 0.2s ease-in-out;
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	padding: 16px;
	&:hover {
		// transform: translate(3px);
		// border: 1px solid #615d71;
	}
	&:active {
		transform: translate(1px, -1px);
	}

	p {
		margin: 0;
		font-weight: 600;
		font-size: 20px;
		line-height: 25px;
		font-family: SemiBold;
		color: white;
		margin-top: 15px;
	}
`;

export const WalletDetails = styled.div`
	margin-top: 40px;
	margin-bottom: 15px;
	p {
		font-size: 16px;
		line-height: 23px;
		font-family: Light;
		color: white;
		margin-top: 15px;
		text-align: center;
		word-break: break-all;
	}
`;

export const LinksFlex = styled.div`
	display: flex;
	justify-content: space-around;
	margin: 0 0 60px 0;
	a {
		color: #fbec5b;
		text-decoration: none;
		font-size: 12px;
		line-height: 19px;
		font-family: Light;
		letter-spacing: 0.3px;
		cursor: pointer;
		@media (min-width: 481px) {
			font-size: 16px;
		}
	}
	img {
		height: 20px;
		margin-left: 5px;
		display: inline-block;
		margin-top: -3px;
		cursor: pointer;
		@media (min-width: 481px) {
			height: 24px;
		}
	}
	p {
		color: white;
		font-size: 12px;
		font-family: Light;
		margin: 0;
	}
`;
const breatheAnimation = keyframes`
 0% {  transform: translateY(0px);}
 25% {  transform: translateY(15px);}
 50% {  transform: translateY(10px);}
 75% { transform: translateY(5px); }
 100% { transform: translateY(0px); }

 `;
export const StatusImage = styled.img`
	animation: ${breatheAnimation} 1.5s linear infinite;
`;
export const StatusContent = styled.div`
	text-align: center;
	a {
		font-family: Light;
		font-size: 16px;
		line-height: 19px;
		color: #fbec5b;
		margin-right: 5px;
		margin-top: 4px;
	}
	p {
		font-family: SemiBold;
		font-weight: 600;
		font-size: 16px;
		line-height: 20px;
		margin: 0;
		color: white;
	}
	h2 {
		font-family: Medium;
		font-size: 16px;
		line-height: 19px;
		margin: 10px 0;
		color: white;
	}

	h3 {
		font-family: Light;
		font-size: 14px;
		line-height: 16px;
		margin: 0;
		color: white;
		font-weight: 300;
	}
`;

export const LinkFlex = styled.div`
	display: flex;

	img {
		margin-top: -4px;
	}
`;
export const ButtonWrapper = styled.div`
	display: flex;
`;
