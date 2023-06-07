import {
	SET_BUSDContract,
	SET_BUSTContract,
	SET_BustPairContract,
	SET_BustRouter02Contract,
	SET_NFTContract,
} from "../actions/constants";

const initialState = {
	BUSDContract: {},
	BUSTContract: {},
	BustPairContract: {},
	BustRouter02Contract: {},
	NFTContract: {},
};

export const abiReducer = (state = initialState, action: any) => {
	const { type, payload } = action;
	switch (type) {
		case SET_BUSDContract:
			return {
				...state,
				BUSDContract: payload,
			};
		case SET_BUSTContract:
			return {
				...state,
				BUSTContract: payload,
			};
		case SET_BustPairContract:
			return {
				...state,
				BustPairContract: payload,
			};
		case SET_BustRouter02Contract:
			return {
				...state,
				BustRouter02Contract: payload,
			};
		case SET_NFTContract:
			return {
				...state,
				NFTContract: payload,
			};
		default:
			return state;
	}
};
