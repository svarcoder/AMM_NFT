import {
	GET_BALANCE,
	SET_ADDRESS,
	SET_CHAINID,
	SET_NETWORKID,
	WALLET_BALANCE,
} from "../actions/constants";

const initialState = {
	amount: 0,
	chainId: 0,
	address: 0,
};

const walletReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case WALLET_BALANCE:
			return {
				...state,
				amount: action.balance,
			};
		case SET_CHAINID:
			return {
				...state,
				chainId: action.value,
			};
		case SET_ADDRESS:
			return {
				...state,
				address: action.value,
			};
		default:
			return state;
	}
};

export default walletReducer;
