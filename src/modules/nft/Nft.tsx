import { withTheme, ThemeProps } from "styled-components";
import { PageContainer } from "../../styles/styled";
import { Navbar } from "../app/components/navbar/Navbar";
import arw from "../../assets/image/arrow.svg";
import { Center, Main, SaleNFT, SubmitButton } from "./style";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import wallet from "../../utils/wallet";
import Big from "big.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card } from "../../shared/card";
import A from "../../assets/image/a.jpg";
import B from "../../assets/image/b.png";
import CreateNFT from "../../shared/create-nft";
import axios from "axios";

export const Nft: React.FC = withTheme((props: ThemeProps<any>) => {
	const { theme } = props;
	const [activeButton, setaAtiveButton] = useState<any>(false);
	const selector = useSelector((state: any) => state);
	const { NFTContract } = selector.abiData;
	const { address } = selector.wallet;

	const [allURI, setAllURI] = useState<any>([]);
	const [allSaleNFT, setAllSaleNFT] = useState<any>([]);

	useEffect(() => {
		const getAllUserToken = async () => {
			try {
				let myAddress = String(address).replace(/['"]+/g, "");
				let allToken = await NFTContract.methods
					.getUsersTokens(myAddress)
					.call();

				let allDetails = [];
				let allDetails2 = [];

				if (allToken.length >= 0) {
					for (let x in allToken) {
						let item = await NFTContract.methods.tokenURI(allToken[x]).call();
						let item2 = await NFTContract.methods.allSales(allToken[x]).call();
						let url = `https://gateway.pinata.cloud/` + item;
						let valueT = await axios.get(url);
						let allId = { id: "", item: null, value: {} };
						if (item2.status === true) {
							let url = `https://gateway.pinata.cloud/` + item;
							let valueI = await axios.get(url);
							allId = { id: allToken[x], item: item2, value: valueI };
							allDetails2.push(allId);
						}

						let allId2 = { id: allToken[x], item: valueT };

						if (allId2.id !== allId.id) {
							allDetails.push(allId2.item);
						}
					}
				}
				setAllURI(allDetails);
				setAllSaleNFT(allDetails2);
			} catch (error) {
				console.log("Error", error);
			}
		};
		console.log("allURI", allURI);
		if (Object.keys(NFTContract).length !== 0) {
			getAllUserToken();
		}
	}, [NFTContract]);

	const burn = async (id: any) => {
		try {
			let myAddress = String(address).replace(/['"]+/g, "");
			let getIndex = await allURI.findIndex(
				(value: any) => value.data.image === id
			);
			let getId = await NFTContract.methods
				.tokenOfOwnerByIndex(myAddress, getIndex)
				.call();
			let value = await NFTContract.methods
				.burn(myAddress, getId)
				.send({ from: String(address).replace(/['"]+/g, "") });
			if (value.status === true) {
				toast.success("Delete NFT Successfully!", {
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
			console.log("Error", error);
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

	const buy = async (id: any) => {
		try {
			let myAddress = String(address).replace(/['"]+/g, "");
			let getIndex = await allSaleNFT.findIndex(
				(saleNFT: any) => saleNFT.value.data.image === id
			);
			let getId = await NFTContract.methods
				.tokenOfOwnerByIndex(myAddress, getIndex)
				.call();

			let getAmount = await NFTContract.methods.allSales(getId).call();

			let amount = wallet.web3.utils.toWei(getAmount.amount, "wei");
			let amount2 = new Big(amount).toNumber();

			let value = await NFTContract.methods.buyNFT(String(getId)).send({
				from: String(address).replace(/['"]+/g, ""),
				value: String(amount2),
			});
			if (value.status === true) {
				toast.success("Buy NFT Successfully!", {
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
			console.log("Error", error);
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
	//console.log({ NFTContract });

	return (
		<PageContainer>
			<Navbar />
			<ToastContainer />
			<Center>
				<SaleNFT
					onClick={() => setaAtiveButton(false)}
					active={activeButton === false ? true : false}>
					Home
				</SaleNFT>
				<CreateNFT closeWalletModal={() => null} />

				<SaleNFT
					onClick={() => setaAtiveButton(true)}
					active={activeButton === true ? true : false}>
					On Sale NFT
				</SaleNFT>
			</Center>
			{activeButton === false ? (
				<Main>
					{allURI &&
						allURI.map((allNFT: any, key: any) => (
							<Card
								userName={allNFT.data.type}
								img={allNFT.data.image}
								title={allNFT.data.title}
								burnFunction={burn}
								allURI={allURI}
							/>
						))}
				</Main>
			) : (
				<Main>
					{allSaleNFT &&
						allSaleNFT.map((saleNFT: any, key: any) => (
							<Card
								userName={saleNFT.value.data.type}
								img={saleNFT.value.data.image}
								title={saleNFT.value.data.title}
								onSale='On Sale'
								price={wallet.web3.utils.fromWei(saleNFT.item.amount, "ether")}
								activeButton={activeButton}
								buyFunction={buy}
							/>
						))}
				</Main>
			)}
		</PageContainer>
	);
});
