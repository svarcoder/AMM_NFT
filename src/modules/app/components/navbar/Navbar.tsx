import { Link, useHistory } from "react-router-dom";
import { HeaderContainer, LogoContainer, Navigations } from "./style";
import { imageUrl } from "../../../../shared/utility";
import { FlexBox } from "../../../../shared/flexBox";
import { DropDown } from "../../../../shared/dropDown";
import React, { useState } from "react";
import ConnectWallet from "../../../../shared/wallet-connect";
import Web3 from "web3";
import { useSelector, useDispatch } from "react-redux";
import history from "../history";
import { Login, setAddress } from "../../../../logic/actions/wallet";

export const Navbar = (props: any) => {
	const [show, setshow] = useState<boolean>(false);

	let navigate = useHistory();

	// let window: any;

	let web3: any = "";

	const [connectWallet, setConnectWallet] = React.useState(false);
	const { walletBalance, walletConnectCheck, address } = useSelector(
		(state: any) => state.wallet
	);
	const [activeLink, setActiveLink] = React.useState(history.location.pathname);
	const dispatch = useDispatch();
	const [walletAddress, setWalletAddress] = React.useState("");

	const web3Provider = async () => {
		try {
			if (window) {
				//@ts-ignore

				web3 = new Web3(window.ethereum);

				return true;
			}
			return false;
		} catch (error) {
			alert("Please install MetaMask to use this dApp!");
		}
	};

	React.useEffect(() => {
		const path = history.location.pathname;
		if (path === "/swap") {
			setActiveLink("swap");
		} else if (path === "/pool") {
			setActiveLink("pool");
		} else if (path === "/farming") {
			setActiveLink("farming");
		} else if (path === "/referral") {
			setActiveLink("referral");
		}
		history.push(history.location.pathname);

		web3Provider();
	}, []);

	React.useEffect(() => {
		//@ts-ignore
		const walletConnect = JSON.parse(localStorage.getItem("walletConnected"));
		setConnectWallet(walletConnect);
		//@ts-ignore
		const address = JSON.parse(localStorage.getItem("address"));
		dispatch(setAddress(address));
		setWalletAddress(address);
		//@ts-ignore
	}, [
		connectWallet,
		setConnectWallet,
		// walletConnectCheck,
		localStorage.getItem("walletConnected"),
	]);

	// get the address of account manually changed from metamask

	React.useEffect(() => {
		web3Provider();
		const changedAccountAddress = async () => {
			web3.currentProvider.on("accountsChanged", async function () {
				window.location.reload();
				let accounts = await web3.eth.getAccounts();
				localStorage.setItem("address", JSON.stringify(accounts));
				dispatch(Login(accounts));
			});
		};
		if (walletAddress !== "") changedAccountAddress();
	}, [walletAddress]);

	React.useEffect(() => {
		web3Provider();
		let accounts = "";
		const changeAdd = async () => {
			accounts = await web3.eth.getAccounts();
			if (accounts.length) {
				accounts = await web3.utils.toChecksumAddress(accounts[0]);

				localStorage.setItem("address", JSON.stringify(accounts));
			}
		};
		if (walletAddress !== "") changeAdd();
	}, [walletAddress]);

	return (
		<HeaderContainer>
			<FlexBox>
				<LogoContainer>
					<img
						src='https://www.bakeryswap.org/static/media/logo.4e93c681.svg'
						alt=''
					/>
					<img
						src='https://www.bakeryswap.org/static/media/wordmark.a003062e.svg'
						alt=''
					/>
				</LogoContainer>

				<Navigations>
					<Link to='/home'>Dashboard</Link>

					<a href='#' onClick={() => setshow(!show)}>
						Trade
						<DropDown show={show} setShow={setshow}>
							<p onClick={() => navigate.push("/swap")}>Exchange</p>
							<p onClick={() => navigate.push("/liquidity")}>Liquidity</p>
						</DropDown>
					</a>

					<Link to='/nft'>NFT</Link>

					<ConnectWallet
						connectWallet={connectWallet}
						walletAddress={walletAddress}
						setConnectWallet={setConnectWallet}
						walletBalance={walletBalance}
						checkWallet={props.checkWallet}
						closeWalletModal={() => null}
						setWalletAddress={setWalletAddress}
					/>
				</Navigations>
			</FlexBox>
		</HeaderContainer>
	);
};
