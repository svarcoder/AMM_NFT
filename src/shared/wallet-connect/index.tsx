import * as React from "react";
import {
	Content,
	AddressInfoWrap,
	AddressInfo,
	WalletOption,
	WalletDetails,
	StatusContent,
	ConnectButtonWrap,
	ButtonWrapper,
} from "./style";
import wallet from "../../utils/wallet";
import {
	Login,
	walletConnectCheck,
	setChainIdValue,
	setNetworkIdValue,
	getBalance,
	setBUSDContract,
	setBustRouter02Contract,
	setBustPairContract,
	setBUSTContract,
	setAddress,
	setNFTContract,
} from "../../logic/actions/wallet";
import CustomModal from "../model/index";
import { WalletTypes } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../button";
import {
	BUSDABI,
	BUSDAddress,
	BUSTABI,
	BustPairABI,
	BUSTAddress,
	BustPairAddress,
	BustRouter02ABI,
	BustRouter02Address,
	NFTAddress,
	NFTABI,
} from "../../modules/blockchain/abi";

const ConnectWallet = (props: any) => {
	const {
		connectWallet,
		walletAddress,
		setConnectWallet,
		setWalletAddress,
		checkWallet,
		showWalletModal,
		closeWalletModal,
	} = props;
	const [walletOptions, setWalletOptions] = React.useState(true);
	const [disconnectWallet, setDisconnectWallet] = React.useState(false);
	const [errorModal, setErrorModal] = React.useState(false);
	const [walletType, setWalletType] = React.useState(false);

	const selector = useSelector((state: any) => state);
	const { chainId, amount } = selector.wallet;

	const dispatch = useDispatch();

	const allContract = () => {
		let BUSDContract = new wallet.web3.eth.Contract(BUSDABI, BUSDAddress);
		dispatch(setBUSDContract(BUSDContract));
		let BUSTContract = new wallet.web3.eth.Contract(BUSTABI, BUSTAddress);
		dispatch(setBUSTContract(BUSTContract));
		let BustPairContract = new wallet.web3.eth.Contract(
			BustPairABI,
			BustPairAddress
		);
		dispatch(setBustPairContract(BustPairContract));
		let BustRouter02Contract = new wallet.web3.eth.Contract(
			BustRouter02ABI,
			BustRouter02Address
		);

		dispatch(setBustRouter02Contract(BustRouter02Contract));
		let NFTContract = new wallet.web3.eth.Contract(NFTABI, NFTAddress);
		dispatch(setNFTContract(NFTContract));
	};

	const connect = async (type: any) => {
		//@ts-ignore
		if (connectWallet) {
			await wallet.disconnect();

			localStorage.removeItem("address");
			localStorage.removeItem("walletConnected");
			localStorage.removeItem("walletType");
			localStorage.clear();
			dispatch(walletConnectCheck(false));
		} else {
			try {
				await wallet.setProvider(type);
				const address = await wallet.login(type);
				dispatch(Login(address));
				setWalletAddress(address);
				const chainid = await wallet.web3.eth.getChainId();

				dispatch(setChainIdValue(chainid));
				dispatch(setAddress(String(address).replace(/['"]+/g, "")));

				if (address !== undefined) {
					setConnectWallet(true);
					localStorage.setItem("address", JSON.stringify(address));
					localStorage.setItem("walletConnected", JSON.stringify(true));
					localStorage.setItem("walletType", JSON.stringify(type));
					dispatch(walletConnectCheck(true));
					allContract();
				}
				//** signature hashing and getting access token **//
				// userCheck(address);
				// SignatureFun(address);
				setWalletOptions(false);
			} catch (error) {
				console.log("error", error);
				// setErrorModal(true);
			}
		}
	};

	const WalletModalClose = () => {
		setWalletOptions(false);
		closeWalletModal();
	};

	React.useEffect(() => {
		//@ts-ignore
		const walletType = JSON.parse(localStorage.getItem("walletType"));
		setWalletType(walletType);
		const address = localStorage.getItem("address");
		setWalletAddress(address);
		dispatch(setAddress(String(address).replace(/['"]+/g, "")));

		if (walletType === 1) allContract();
	}, []);

	React.useEffect(() => {
		const setChainId = async () => {
			try {
				const chainid = await wallet.web3.eth.getChainId();

				dispatch(setChainIdValue(chainid));
			} catch (e) {
				dispatch(setChainIdValue(0));
			}
		};
		const setBalance = async () => {
			try {
				const address = localStorage.getItem("address");

				if (address !== "" && address !== null) {
					dispatch(getBalance(address.replace(/['"]+/g, "")));
				}
			} catch (e) {
				dispatch(setNetworkIdValue(0));
			}
		};
		setChainId();
		setBalance();
	}, [checkWallet, dispatch]);

	React.useEffect(() => {
		//@ts-ignore
		const switchWallet = JSON.parse(localStorage.getItem("switch"));
		if (switchWallet) {
			setWalletOptions(true);
			localStorage.removeItem("switch");
		}
	}, []);

	const getAddress = (address: string) => {
		const add1 = address.substring(0, 6);
		const add2 = address.substring(address.length - 6);
		const finalAdd = `${add1}....${add2}`;
		return finalAdd;
	};

	return (
		<>
			<Content>
				{walletAddress !== "" && connectWallet ? (
					<AddressInfo onClick={() => setDisconnectWallet(true)}>
						{walletAddress
							? getAddress(walletAddress.replace(/['"]+/g, ""))
							: null}
					</AddressInfo>
				) : (
					<ConnectButtonWrap onClick={() => setWalletOptions(true)}>
						Connect
					</ConnectButtonWrap>
				)}

				<CustomModal
					show={walletOptions || showWalletModal}
					toggleModal={setWalletOptions}
					heading='Connect to a Wallet'>
					<div style={{ marginTop: "25px" }}>
						{chainId == 0 ? null : (
							<WalletOption onClick={() => connect(WalletTypes.metamask)}>
								<p>Metamask</p>

								<img
									src={require("../../assets/image/metamask.svg").default}
									alt=''
								/>
							</WalletOption>
						)}
						<WalletOption onClick={() => connect(WalletTypes.walletConnect)}>
							{chainId == 0 ? <p>WalletConnect</p> : <p>TrustWallet</p>}
							<img
								src={require("../../assets/image/trustWallet.svg").default}
								alt=''
							/>
						</WalletOption>
					</div>
				</CustomModal>

				{localStorage.getItem("address") && (
					<CustomModal
						show={disconnectWallet}
						toggleModal={setDisconnectWallet}
						heading='Your Wallet'>
						<WalletDetails>
							<p>
								Address:{" "}
								{walletAddress ? walletAddress.replace(/['"]+/g, "") : null}
							</p>
							<p>Chain Id: {chainId}</p>
							<p>
								Balance:{" "}
								{amount
									? wallet.web3.utils.fromWei(amount.toString(), "ether")
									: 0}
							</p>
							<div style={{ textAlign: "center" }}>
								<Button
									align='center'
									onClick={() => {
										connect(walletType);
										setDisconnectWallet(false);
									}}>
									Logout
								</Button>
							</div>
						</WalletDetails>
					</CustomModal>
				)}

				<CustomModal
					show={errorModal}
					toggleModal={() => {
						setErrorModal(false);
						setWalletOptions(false);
					}}
					heading='Authorization Error'>
					<StatusContent>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								margin: "40px 0px 100px 0",
							}}>
							<p>Please authorize to access your account</p>
						</div>

						<ButtonWrapper>
							<Button
								onClick={() => {
									setErrorModal(false);
								}}>
								DISMISS
							</Button>
							<Button
								onClick={() => {
									setWalletOptions(true);
									setErrorModal(false);
								}}>
								GET A WALLET
							</Button>
						</ButtonWrapper>
					</StatusContent>
				</CustomModal>
			</Content>
		</>
	);
};
export default ConnectWallet;
