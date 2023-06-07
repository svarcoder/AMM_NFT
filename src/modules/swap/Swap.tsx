import { withTheme, ThemeProps } from "styled-components";
import { PageContainer } from "../../styles/styled";
import { Navbar } from "../app/components/navbar/Navbar";
import arw from "../../assets/image/arrow.svg";
import {
	AllInput,
	BUST,
	Button,
	Card,
	CardDescription,
	CardTitle,
	Center,
	Input,
	LiquidityPool,
	Main,
	PButton,
	PercentComponent,
	PlsButton,
	PolledComponent,
	PollEl,
	PollTitle,
	Price,
	SubmitButton,
	Title,
} from "./style";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import wallet from "../../utils/wallet";
import Big from "big.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Swap: React.FC = withTheme((props: ThemeProps<any>) => {
	const { theme } = props;

	const selector = useSelector((state: any) => state);
	const { BUSDContract, BUSTContract, BustPairContract, BustRouter02Contract } =
		selector.abiData;
	const { address } = selector.wallet;
	console.log({
		BUSDContract,
		BUSTContract,
		BustPairContract,
		BustRouter02Contract,
	});

	const [balance, setBalance] = useState<any>({
		busdBalance: "0",
		bustBalance: "0",
	});

	const [activeInput, setActiveInput] = useState<any>({
		busdInput: false,
		bustInput: false,
	});

	useEffect(() => {
		const getMetaMaskBalance = async () => {
			let myAddress = String(address).replace(/['"]+/g, "");
			let balanceD = await BUSDContract.methods.balanceOf(myAddress).call();
			let mainBalanceD = wallet.web3.utils.fromWei(balanceD, "ether");
			let busdBalance = new Big(mainBalanceD).toNumber().toFixed(4);
			let balanceT = await BUSTContract.methods.balanceOf(myAddress).call();
			let mainBalanceT = wallet.web3.utils.fromWei(balanceT, "ether");
			let bustBalance = new Big(mainBalanceT).toNumber().toFixed(4);
			setBalance({
				busdBalance,
				bustBalance,
			});
		};

		if (
			Object.keys(BUSDContract).length !== 0 &&
			Object.keys(BUSTContract).length !== 0
		) {
			getMetaMaskBalance();
		}
	}, [BUSDContract, BUSTContract, wallet]);

	const [inputValue, setInputValue] = useState({
		busdValue: "",
		bustValue: "",
	});

	const getQuote = async (bustValue: any) => {
		try {
			let token0 = await BustPairContract.methods.token0().call();
			let token1 = await BustPairContract.methods.token1().call();

			let toWeiValue = await wallet.web3.utils.toWei(
				bustValue.toString(),
				"ether"
			);

			let value = await BustRouter02Contract.methods
				.getAmountsOut(toWeiValue, [token0, token1])
				.call();

			let finalValue = await wallet.web3.utils.fromWei(value[1], "ether");
			return finalValue;
		} catch (error) {
			console.log("Error", error);
		}
	};

	const getQuote2 = async (busdValue: any) => {
		try {
			let token0 = await BustPairContract.methods.token0().call();
			let token1 = await BustPairContract.methods.token1().call();
			let toWeiValue = await wallet.web3.utils.toWei(
				busdValue.toString(),
				"ether"
			);
			let value = await BustRouter02Contract.methods
				.getAmountsIn(toWeiValue, [token0, token1])
				.call();

			let finalValue = await wallet.web3.utils.fromWei(value[0], "ether");
			return finalValue;
		} catch (error) {
			console.log("Error", error);
		}
	};

	const handleChange = (event: any) => {
		if (event.target.name === "busdValue") {
			console.log("data", event.target.value);
			setActiveInput({
				busdInput: true,
				bustInput: false,
			});
			setInputValue({
				busdValue: event.target.value,
				bustValue: "",
			});
			getQuote(event.target.value)
				.then((data) => {
					if (data !== null && data !== undefined) {
						setInputValue({
							busdValue: event.target.value,
							bustValue: String(data),
						});
					}
				})
				.catch((err) => {
					console.log("err", err);
				});
		} else if (event.target.name === "bustValue") {
			setActiveInput({
				busdInput: false,
				bustInput: true,
			});
			setInputValue({
				busdValue: "",
				bustValue: event.target.value,
			});
			getQuote2(event.target.value)
				.then((data) => {
					if (data !== null && data !== undefined) {
						setInputValue({
							busdValue: String(data),
							bustValue: event.target.value,
						});
					}
				})
				.catch((err) => {
					console.log("err", err);
				});
		}
	};

	const approved = async () => {
		try {
			let amountADesired = await wallet.web3.utils.toWei("500", "ether");

			let busdApprove = await BUSDContract.methods
				.approve("0xBEDa4Ea077766b43092397B0AE7D53bC999561eB", amountADesired)
				.send({ from: String(address).replace(/['"]+/g, ""), gas: "2000000" });
			let bustApprove = await BUSTContract.methods
				.approve("0xBEDa4Ea077766b43092397B0AE7D53bC999561eB", amountADesired)
				.send({ from: String(address).replace(/['"]+/g, ""), gas: "2000000" });
			if (busdApprove.status === true && bustApprove.status === true) {
				toast.success("Approve Successfull!", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}

			//console.log({ busdApprove, bustApprove });
		} catch (error) {
			console.log("Error", error);
			toast.error("Approved Failed!", {
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

	const swap = async () => {
		try {
			await approved();

			if (activeInput.busdInput === true) {
				let amountIn = wallet.web3.utils.toWei(
					inputValue.busdValue.toString(),
					"ether"
				);
				let amountOutMin = wallet.web3.utils.toWei(
					inputValue.bustValue.toString(),
					"ether"
				);
				let tokenA = await BustPairContract.methods.token0().call();
				let tokenB = await BustPairContract.methods.token1().call();
				let path = [tokenA, tokenB];
				let to = String(address).replace(/['"]+/g, "");
				let deadline = (Math.round(+new Date() / 1000) + 900).toString();
				console.log({
					amountIn,
					amountOutMin,
					path,
					to,
					deadline,
				});

				let value = await BustRouter02Contract.methods
					.swapExactTokensForTokens(amountIn, amountOutMin, path, to, deadline)
					.send({
						from: String(address).replace(/['"]+/g, ""),
						gas: "2000000",
					});
				if (value.status === true) {
					toast.success("Swap Successfully!", {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				}

				//console.log("Swap 1 Done______", value);
			} else if (activeInput.bustInput === true) {
				let amountOut = wallet.web3.utils.toWei(
					inputValue.bustValue.toString(),
					"ether"
				);
				let amountInMax = wallet.web3.utils.toWei(
					inputValue.busdValue.toString(),
					"ether"
				);
				let tokenA = await BustPairContract.methods.token0().call();
				let tokenB = await BustPairContract.methods.token1().call();
				let path = [tokenA, tokenB];
				let to = String(address).replace(/['"]+/g, "");
				let deadline = (Math.round(+new Date() / 1000) + 900).toString();
				console.log({
					amountOut,
					amountInMax,
					path,
					to,
					deadline,
				});
				let value = await BustRouter02Contract.methods
					.swapTokensForExactTokens(amountOut, amountInMax, path, to, deadline)
					.send({
						from: String(address).replace(/['"]+/g, ""),
						gas: "2000000",
					});
				if (value.status === true) {
					toast.success("Swap Successfully!", {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				}

				//console.log("Final 2 Done______", value);
			}
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

	return (
		<PageContainer>
			<Navbar />
			<ToastContainer />
			<Main>
				<LiquidityPool>
					<Card>
						<CardTitle>
							<Button>Swap</Button>
						</CardTitle>

						<CardDescription>
							<AllInput>
								<Title>
									<p>BUSD</p>
									<p>
										Balance: {balance.busdBalance ? balance.busdBalance : 0}
									</p>
								</Title>
								<Input
									placeholder='0.00'
									id='busdValue'
									name='busdValue'
									value={inputValue.busdValue}
									onChange={handleChange}
								/>
							</AllInput>

							<PlsButton>
								<img src={arw} alt='' />
							</PlsButton>

							<AllInput>
								<Title>
									<p>BUST</p>
									<p>
										Balance: {balance.bustBalance ? balance.bustBalance : 0}
									</p>
								</Title>
								<Input
									placeholder='0.00'
									id='bustValue'
									name='bustValue'
									value={inputValue.bustValue}
									onChange={handleChange}
								/>
							</AllInput>
							<Price>
								<BUST>Slippage tolerance: 0.5%</BUST>
								<BUST>Transaction deadline: 15 min</BUST>
							</Price>
							<Price>
								<BUST>1BUSD = 2.490698 BUST</BUST>
								<BUST>1BUST = 0.401490 BUSD</BUST>
							</Price>
							<Center>
								<SubmitButton onClick={swap}>Swap</SubmitButton>
							</Center>
						</CardDescription>
					</Card>
				</LiquidityPool>
			</Main>
		</PageContainer>
	);
});
