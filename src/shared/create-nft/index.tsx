import * as React from "react";
import {
	Content,
	ConnectButtonWrap,
	MainCard,
	LeftCard,
	AtworkType,
	AllInput,
	Title,
	ArtistName,
	RightCard,
	AtworkImg,
	Description,
	Mint,
	ImgInput,
	ImgCover,
	Center,
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

const CreateNFT = (props: any) => {
	const { showWalletModal, closeWalletModal } = props;
	const [walletOptions, setWalletOptions] = React.useState(false);
	const selector = useSelector((state: any) => state);
	const { NFTContract } = selector.abiData;
	const { address } = selector.wallet;

	const [selectedItem, setSelectedItem] = React.useState({
		type: "",
		title: "",
		name: "",
		image: null,
		description: "",
	});
	const [imageLink, setImageLink] = React.useState("");

	const inputFile = React.useRef(null);

	const WalletModalClose = () => {
		setWalletOptions(false);
		closeWalletModal();
	};

	const handelChange = async (event: any) => {
		event.preventDefault();
		let data = new FormData();
		if (event.target.id === "image1") {
			toast.info("Wait For Image Upload!", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			let __tempImages = event.target.files[0];
			setSelectedItem((prevState) => {
				return {
					...prevState,
					image: __tempImages,
				};
			});
			const metadata = JSON.stringify({
				name: selectedItem.title,
				keyvalues: {
					exampleKey: "exampleValue",
				},
			});

			try {
				const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
				data.append("pinataMetadata", metadata);
				data.append("file", __tempImages);
				let sendFile = await axios.post(url, data, {
					headers: {
						pinata_api_key: pinataApiKey,
						pinata_secret_api_key: pinataSecretApiKey,
						authorization: `Bearer ${token}`,
					},
				});
				console.log("sendFile", sendFile);
				if (sendFile.data !== null) {
					let link =
						"https://gateway.pinata.cloud/ipfs/" + sendFile.data.IpfsHash;
					setImageLink(link);
					toast.success("Now, You can Mint!", {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				}
			} catch (error) {
				console.log("error", error);
				toast.error("Image Upload Failed!", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
		} else {
			setSelectedItem({
				...selectedItem,
				[event.target.id]: event.target.value,
			});
		}
	};

	const onButtonClick = (inputFile: any) => {
		inputFile.current.click();
	};

	const mint = async () => {
		try {
			WalletModalClose();
			const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
			const JSONBody = {
				type: selectedItem.type,
				title: selectedItem.title,
				name: selectedItem.name,
				image: imageLink,
				description: selectedItem.description,
				status: true,
			};
			let sendJSON = await axios.post(url, JSONBody, {
				headers: {
					pinata_api_key: pinataApiKey,
					pinata_secret_api_key: pinataSecretApiKey,
					authorization: `Bearer ${token}`,
				},
			});
			if (sendJSON.data !== null) {
				let userAddress = String(address).replace(/['"]+/g, "");
				let mintUrl = "ipfs/" + sendJSON.data.IpfsHash;
				let mintData = await NFTContract.methods
					.mint(userAddress, mintUrl)
					.send({
						from: userAddress,
					});
				if (mintData.status === true) {
					toast.success("Create NFT Successfully!", {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				}
				//console.log("mintData", mintData);
			}
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
					Create
				</ConnectButtonWrap>
				<ToastContainer />
				<CustomModal
					show={walletOptions || showWalletModal}
					toggleModal={WalletModalClose}
					heading='Create a NFT'>
					<div style={{ marginTop: "25px" }}>
						<MainCard>
							<LeftCard>
								<AtworkType>
									<p>Artwork Type *</p>
									<AllInput
										placeholder='Enter NFT Type'
										id='type'
										value={selectedItem.type}
										onChange={handelChange}
									/>
								</AtworkType>
								<Title>
									<p>Title *</p>
									<AllInput
										placeholder='Enter Title'
										id='title'
										value={selectedItem.title}
										onChange={handelChange}
									/>
								</Title>
								<ArtistName>
									<p>Artist Name *</p>
									<AllInput
										placeholder='Enter Artist Name'
										id='name'
										value={selectedItem.name}
										onChange={handelChange}
									/>
								</ArtistName>
							</LeftCard>
							<RightCard>
								<AtworkImg>
									<p>Upload artwork image *</p>
									<ImgCover>
										{selectedItem.image ? (
											<div>
												<img
													alt='not fount'
													width={"210px"}
													height={"270px"}
													style={{ borderRadius: "10px" }}
													src={URL.createObjectURL(selectedItem.image)}
												/>
											</div>
										) : (
											<img
												src='https://www.bakeryswap.org/images/nft/add.png'
												alt=''
												onClick={() => onButtonClick(inputFile)}
											/>
										)}

										<ImgInput
											type='file'
											ref={inputFile}
											id='image1'
											onChange={handelChange}
										/>
									</ImgCover>
								</AtworkImg>
							</RightCard>
						</MainCard>
						<Description>
							<p>Description *</p>
							<AllInput
								inputWidth={"150px"}
								placeholder='Enter Description'
								id='description'
								value={selectedItem.description}
								onChange={handelChange}
							/>
						</Description>
						<Center>
							<Mint onClick={mint}>Mint</Mint>
						</Center>
					</div>
				</CustomModal>
			</Content>
		</>
	);
};
export default CreateNFT;
