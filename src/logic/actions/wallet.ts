import {
	GET_BALANCE,
	LOGIN,
	WALLET_CONNECT_CHECK,
	SET_CHAINID,
	WALLET_BALANCE,
	SET_NETWORKID,
	SET_BustRouter02Contract,
	SET_BustPairContract,
	SET_BUSTContract,
	SET_BUSDContract,
	SET_ADDRESS,
	SET_NFTContract,
} from "./constants";
import wallet from "../../utils/wallet";

export const getLPBalance = (amount: any) => {
	return {
		type: GET_BALANCE,
		lp_Balance: amount,
	};
};

export const Login = (userAddress: String) => {
	return {
		type: LOGIN,
		address: userAddress,
	};
};

export const walletConnectCheck = (value: any) => {
	return {
		type: WALLET_CONNECT_CHECK,
		value: value,
	};
};
export const setChainIdValue = (val: any) => {
	return {
		type: SET_CHAINID,
		value: val,
	};
};
export const setAddress = (val: any) => {
	return {
		type: SET_ADDRESS,
		value: val,
	};
};
export const setNetworkIdValue = (val: any) => {
	return {
		type: SET_NETWORKID,
		value: val,
	};
};
export const getWalletBalance = (balance: String) => {
	return {
		type: WALLET_BALANCE,
		balance: balance,
	};
};

export const getBalance = (address: any) => async (dispatch: any) => {
	if (address) {
		const balance = await wallet.web3.eth.getBalance(address);
		dispatch(getWalletBalance(balance));
		dispatch(getLPBalance(address));
	}
};

export const setBUSDContract = (data: any) => {
	return {
		type: SET_BUSDContract,
		payload: data,
	};
};
export const setBUSTContract = (data: any) => {
	return {
		type: SET_BUSTContract,
		payload: data,
	};
};
export const setBustPairContract = (data: any) => {
	return {
		type: SET_BustPairContract,
		payload: data,
	};
};
export const setBustRouter02Contract = (data: any) => {
	return {
		type: SET_BustRouter02Contract,
		payload: data,
	};
};
export const setNFTContract = (data: any) => {
	return {
		type: SET_NFTContract,
		payload: data,
	};
};
