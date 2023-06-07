import { withTheme, ThemeProps } from "styled-components";
import { PageContainer } from "../../styles/styled";
import { Navbar } from "../app/components/navbar/Navbar";
import pls from "../../assets/image/pls.svg";
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
	TInput,
	Title,
} from "./style";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import wallet from "../../utils/wallet";
import Big from "big.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Liquidity: React.FC = withTheme((props: ThemeProps<any>) => {
	const { theme } = props;

	const [activeButton, setaAtiveButton] = useState<any>(false);
	const [activePercent, setActivePercent] = useState<any>({
		P25: false,
		P50: false,
		P75: false,
		PMax: false,
	});

	const selector = useSelector((state: any) => state);
	const { BUSDContract, BUSTContract, BustPairContract, BustRouter02Contract } =
		selector.abiData;
	const { address } = selector.wallet;

	const [balance, setBalance] = useState<any>({
		busdBalance: "0",
		bustBalance: "0",
		lpBalance: "____",
		busdPoolBalance: "____",
		bustPoolBalance: "____",
		lpSelectedBalance: "____",
		busdSelectedBalance: "____",
		bustSelectedBalance: "____",
	});

	const [removeBalance, setremoveBalance] = useState<any>({
		balanceLP: "0",
		busdPool: "0",
		bustPool: "0",
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
			setBalance((prevValue: any) => ({
				...prevValue,
				busdBalance,
				bustBalance,
			}));
		};
		const getPooledBalance = async () => {
			let myAddress = String(address).replace(/['"]+/g, "");
			let balanceLP = await BustPairContract.methods
				.balanceOf(myAddress)
				.call();
			let mainBalanceLP = wallet.web3.utils.fromWei(balanceLP, "ether");
			let lpBalance = new Big(mainBalanceLP).toNumber().toFixed(4);

			let reserveValue = await BustPairContract.methods.getReserves().call();
			let totalSupplyalue = await BustPairContract.methods.totalSupply().call();

			let busdPool = (reserveValue._reserve0 / totalSupplyalue) * balanceLP;
			let mainBusdPool = wallet.web3.utils.fromWei(
				busdPool.toString(),
				"ether"
			);
			let busdPoolBalance = new Big(mainBusdPool).toNumber().toFixed(4);

			let bustPool = (reserveValue._reserve1 / totalSupplyalue) * balanceLP;
			let mainBustPool = wallet.web3.utils.fromWei(
				bustPool.toString(),
				"ether"
			);
			let bustPoolBalance = new Big(mainBustPool).toNumber().toFixed(4);
			setBalance((prevValue: any) => ({
				...prevValue,
				lpBalance,
				busdPoolBalance,
				bustPoolBalance,
			}));
			setremoveBalance((prevValue: any) => ({
				...prevValue,
				balanceLP,
				busdPool,
				bustPool,
			}));
		};

		const getSelectedBalance = async () => {
			if (activePercent.P25 === true) {
				let balanceLP = 0.25 * balance.lpBalance;
				let lpSelectedBalance = new Big(balanceLP).toNumber().toFixed(4);
				let balanceBusd = 0.25 * balance.busdPoolBalance;
				let busdSelectedBalance = new Big(balanceBusd).toNumber().toFixed(4);
				let balanceBust = 0.25 * balance.bustPoolBalance;
				let bustSelectedBalance = new Big(balanceBust).toNumber().toFixed(4);
				setBalance((prevValue: any) => ({
					...prevValue,
					lpSelectedBalance,
					busdSelectedBalance,
					bustSelectedBalance,
				}));
			} else if (activePercent.P50 === true) {
				let balanceLP = 0.5 * balance.lpBalance;
				let lpSelectedBalance = new Big(balanceLP).toNumber().toFixed(4);
				let balanceBusd = 0.5 * balance.busdPoolBalance;
				let busdSelectedBalance = new Big(balanceBusd).toNumber().toFixed(4);
				let balanceBust = 0.5 * balance.bustPoolBalance;
				let bustSelectedBalance = new Big(balanceBust).toNumber().toFixed(4);
				setBalance((prevValue: any) => ({
					...prevValue,
					lpSelectedBalance,
					busdSelectedBalance,
					bustSelectedBalance,
				}));
			} else if (activePercent.P75 === true) {
				let balanceLP = 0.75 * balance.lpBalance;
				let lpSelectedBalance = new Big(balanceLP).toNumber().toFixed(4);
				let balanceBusd = 0.75 * balance.busdPoolBalance;
				let busdSelectedBalance = new Big(balanceBusd).toNumber().toFixed(4);
				let balanceBust = 0.75 * balance.bustPoolBalance;
				let bustSelectedBalance = new Big(balanceBust).toNumber().toFixed(4);
				setBalance((prevValue: any) => ({
					...prevValue,
					lpSelectedBalance,
					busdSelectedBalance,
					bustSelectedBalance,
				}));
			} else if (activePercent.PMax === true) {
				setBalance((prevValue: any) => ({
					...prevValue,
					lpSelectedBalance: balance.lpBalance,
					busdSelectedBalance: balance.busdPoolBalance,
					bustSelectedBalance: balance.bustPoolBalance,
				}));
			} else {
				setBalance((prevValue: any) => ({
					...prevValue,
					lpSelectedBalance: "____",
					busdSelectedBalance: "____",
					bustSelectedBalance: "____",
				}));
			}
		};

		if (
			Object.keys(BUSDContract).length !== 0 &&
			Object.keys(BUSTContract).length !== 0
		) {
			getMetaMaskBalance();
		}

		if (Object.keys(BustPairContract).length !== 0) {
			getPooledBalance();
		}
		if (activePercent && balance) {
			getSelectedBalance();
		}
	}, [BUSDContract, BUSTContract, BustPairContract, activePercent]);

	const [inputValue, setInputValue] = useState({
		busdValue: "",
		bustValue: "",
	});

	const getQuote = async (busdValue: any) => {
		try {
			let reserveValue = await BustPairContract.methods.getReserves().call();
			let toWeiValue = await wallet.web3.utils.toWei(busdValue);
			let value = await BustRouter02Contract.methods
				.quote(toWeiValue, reserveValue._reserve0, reserveValue._reserve1)
				.call();
			let finalValue = await wallet.web3.utils.fromWei(value);
			return finalValue;
		} catch (error) {
			console.log("Error", error);
		}
	};

	const getQuote2 = async (busdValue: any) => {
		try {
			let reserveValue = await BustPairContract.methods.getReserves().call();
			let toWeiValue = await wallet.web3.utils.toWei(busdValue);
			let value = await BustRouter02Contract.methods
				.quote(toWeiValue, reserveValue._reserve1, reserveValue._reserve0)
				.call();
			let finalValue = await wallet.web3.utils.fromWei(value);
			return finalValue;
		} catch (error) {
			console.log("Error", error);
		}
	};

	const handleChange = (event: any) => {
		if (event.target.name === "busdValue") {
			console.log("data", event.target.value);

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
			//console.log({ busdApprove, bustApprove });
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

	const removeApproved = async () => {
		try {
			let liquidity = 0;

			if (activePercent.P25 === true) {
				liquidity = Number(removeBalance.balanceLP) * 0.25;
			} else if (activePercent.P50 === true) {
				liquidity = Number(removeBalance.balanceLP) * 0.5;
			} else if (activePercent.P75 === true) {
				liquidity = Number(removeBalance.balanceLP) * 0.75;
			} else if (activePercent.PMax === true) {
				liquidity = Number(removeBalance.balanceLP);
			}
			let amountADesired = await wallet.web3.utils.toWei(
				liquidity.toString(),
				"ether"
			);
			let lpApprove = await BustPairContract.methods
				.approve("0xBEDa4Ea077766b43092397B0AE7D53bC999561eB", amountADesired)
				.send({ from: String(address).replace(/['"]+/g, ""), gas: "2000000" });
			if (lpApprove.status === true) {
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
			//console.log({ lpApprove });
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

	const supply = async () => {
		try {
			await approved();
			let tokenA = await BustPairContract.methods.token0().call();
			let tokenB = await BustPairContract.methods.token1().call();
			let amountADesired = wallet.web3.utils
				.toWei(inputValue.busdValue, "ether")
				.toString();
			let amountBDesired = wallet.web3.utils
				.toWei(inputValue.bustValue, "ether")
				.toString();
			let MinA =
				Number(inputValue.busdValue) - 0.005 * Number(inputValue.busdValue);
			let amountAMin = wallet.web3.utils.toWei(MinA.toString(), "ether");
			let MinB =
				Number(inputValue.bustValue) - 0.005 * Number(inputValue.bustValue);
			let amountBMin = wallet.web3.utils.toWei(MinB.toString(), "ether");
			let to = String(address).replace(/['"]+/g, "");
			let deadline = (Math.round(+new Date() / 1000) + 900).toString();
			let value = await BustRouter02Contract.methods
				.addLiquidity(
					tokenA,
					tokenB,
					amountADesired,
					amountBDesired,
					amountAMin,
					amountBMin,
					to,
					deadline
				)
				.send({ from: String(address).replace(/['"]+/g, ""), gas: "2000000" });
			if (value.status === true) {
				toast.success("Add Liquidity Successfully!", {
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

	const remove = async () => {
		try {
			await removeApproved();
			let liquidity = 0;
			let balanceBusd = 0;
			let balanceBust = 0;
			let tokenA = await BustPairContract.methods.token0().call();
			let tokenB = await BustPairContract.methods.token1().call();
			if (activePercent.P25 === true) {
				liquidity = Number(removeBalance.balanceLP) * 0.25;
				balanceBusd = Number(removeBalance.busdPool) * 0.25;
				balanceBust = Number(removeBalance.bustPool) * 0.25;
			} else if (activePercent.P50 === true) {
				liquidity = Number(removeBalance.balanceLP) * 0.5;
				balanceBusd = Number(removeBalance.busdPool) * 0.5;
				balanceBust = Number(removeBalance.bustPool) * 0.5;
			} else if (activePercent.P75 === true) {
				liquidity = Number(removeBalance.balanceLP) * 0.75;
				balanceBusd = Number(removeBalance.busdPool) * 0.75;
				balanceBust = Number(removeBalance.bustPool) * 0.75;
			} else if (activePercent.PMax === true) {
				liquidity = Number(removeBalance.balanceLP);
				balanceBusd = Number(removeBalance.busdPool);
				balanceBust = Number(removeBalance.bustPool);
			}

			let mainLiquidity = liquidity.toString();

			let MinA = Number(balanceBusd) - 0.005 * Number(balanceBusd);
			let amountAMin = MinA.toString();

			let MinB = Number(balanceBust) - 0.005 * Number(balanceBust);
			let amountBMin = MinB.toString();
			let to = String(address).replace(/['"]+/g, "");
			let deadline = (Math.round(+new Date() / 1000) + 900).toString();
			let value = await BustRouter02Contract.methods
				.removeLiquidity(
					tokenA,
					tokenB,
					mainLiquidity,
					amountAMin,
					amountBMin,
					to,
					deadline
				)
				.send({ from: String(address).replace(/['"]+/g, "") });
			if (value.status === true) {
				toast.success("Remove Liquidity Successfully!", {
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

	return (
		<PageContainer>
			<Navbar />
			<ToastContainer />
			<Main>
				<LiquidityPool>
					<Card>
						<CardTitle>
							<Button
								onClick={() => setaAtiveButton(false)}
								active={activeButton === false ? true : false}>
								Add
							</Button>
							<Button
								onClick={() => setaAtiveButton(true)}
								active={activeButton === true ? true : false}>
								Remove
							</Button>
						</CardTitle>
						{activeButton === false ? (
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
									<img src={pls} alt='' />
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
									<BUST>1BUSD = 2.495727 BUST</BUST>
									<BUST>1BUST = 0.400685 BUSD</BUST>
								</Price>
								<Center>
									<SubmitButton onClick={supply}>Supply</SubmitButton>
								</Center>
							</CardDescription>
						) : (
							<CardDescription>
								<PercentComponent>
									<PButton
										onClick={() =>
											setActivePercent({
												P25: true,
											})
										}
										show={activePercent.P25 === true ? true : false}>
										25%
									</PButton>
									<PButton
										onClick={() =>
											setActivePercent({
												P50: true,
											})
										}
										show={activePercent.P50 === true ? true : false}>
										50%
									</PButton>
									<PButton
										onClick={() =>
											setActivePercent({
												P75: true,
											})
										}
										show={activePercent.P75 === true ? true : false}>
										75%
									</PButton>
									<PButton
										onClick={() =>
											setActivePercent({
												PMax: true,
											})
										}
										show={activePercent.PMax === true ? true : false}>
										Max
									</PButton>
								</PercentComponent>
								<PolledComponent>
									<PollTitle>Pooled Tokens</PollTitle>
									<PollEl>
										<span>
											{balance.lpBalance ? balance.lpBalance : "____"}
										</span>
										<span>BUST-LP</span>
									</PollEl>
									<PollEl>
										<span>
											{balance.busdPoolBalance
												? balance.busdPoolBalance
												: "____"}
										</span>
										<span>BUSD</span>
									</PollEl>
									<PollEl>
										<span>
											{balance.bustPoolBalance
												? balance.bustPoolBalance
												: "____"}
										</span>
										<span>BUST</span>
									</PollEl>
								</PolledComponent>
								<PolledComponent>
									<PollTitle>Selected Tokens</PollTitle>
									<PollEl>
										<span>
											{balance.lpSelectedBalance
												? balance.lpSelectedBalance
												: "____"}
										</span>
										<span>BUST-LP</span>
									</PollEl>
									<PollEl>
										<span>
											{balance.busdSelectedBalance
												? balance.busdSelectedBalance
												: "____"}
										</span>
										<span>BUSD</span>
									</PollEl>
									<PollEl>
										<span>
											{balance.bustSelectedBalance
												? balance.bustSelectedBalance
												: "____"}
										</span>
										<span>BUST</span>
									</PollEl>
								</PolledComponent>
								<Price>
									<BUST>Slippage tolerance: 0.5%</BUST>
									<BUST>Transaction deadline: 15 min</BUST>
								</Price>
								<Price>
									<BUST>1BUSD = 2.495727 BUST</BUST>
									<BUST>1BUST = 0.400685 BUSD</BUST>
								</Price>
								<Center>
									<SubmitButton onClick={remove}>Remove</SubmitButton>
								</Center>
							</CardDescription>
						)}
					</Card>
				</LiquidityPool>
			</Main>
		</PageContainer>
	);
});
