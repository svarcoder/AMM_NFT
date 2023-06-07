import * as React from "react";
import {
	Content,
	ConnectButtonWrap,
	MainCard,
	Mint,
	Center,
	AllInput,
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
} from "../../modules/blockchain/abi";
import axios from "axios";
import { pinataApiKey, pinataSecretApiKey, token } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SellNFT = (props: any) => {
	const { showWalletModal, closeWalletModal, allURI, id } = props;
	const [walletOptions, setWalletOptions] = React.useState(false);
	const selector = useSelector((state: any) => state);
	const { NFTContract } = selector.abiData;
	const { address } = selector.wallet;

	const [selectedItem, setSelectedItem] = React.useState({
		amount: "",
	});

	const WalletModalClose = () => {
		setWalletOptions(false);
		closeWalletModal();
	};

	const handelChange = async (event: any) => {
		event.preventDefault();

		setSelectedItem({
			...selectedItem,
			[event.target.id]: event.target.value,
		});
	};

	console.log("allURI", allURI);

	const sell = async (id: any) => {
		try {
			WalletModalClose();
			let myAddress = String(address).replace(/['"]+/g, "");
			let getIndex = await allURI.findIndex(
				(value: any) => value.data.image === id
			);
			let getId = await NFTContract.methods
				.tokenOfOwnerByIndex(myAddress, getIndex)
				.call();
			let amount = wallet.web3.utils.toWei(selectedItem.amount, "ether");
			let value = await NFTContract.methods
				.sale(getId, amount)
				.send({ from: String(address).replace(/['"]+/g, "") });

			if (value.status === true) {
				toast.success("Sell NFT Successfully!", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
			//console.log("Final Done______", value);
		} catch (error) {
			console.log("error", error);
			toast.error("Transaction Failed!", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	return (
		<>
			<Content>
				<ConnectButtonWrap onClick={() => setWalletOptions(true)}>
					Sell
				</ConnectButtonWrap>
				<ToastContainer />
				<CustomModal
					show={walletOptions || showWalletModal}
					toggleModal={WalletModalClose}
					heading='Sell a NFT'>
					<div style={{ marginTop: "25px" }}>
						<MainCard>
							<p>Amount *</p>
							<AllInput
								placeholder='Enter Amount'
								id='amount'
								value={selectedItem.amount}
								onChange={handelChange}
							/>
						</MainCard>

						<Center>
							<Mint onClick={() => sell(id)}>Sell</Mint>
						</Center>
					</div>
				</CustomModal>
			</Content>
		</>
	);
};
export default SellNFT;
