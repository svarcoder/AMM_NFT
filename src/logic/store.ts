import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { abiReducer } from "./reducers/abi.reducer";
import walletReducer from "./reducers/wallet.reducer";

const rootReducer = combineReducers({
	wallet: walletReducer,
	abiData: abiReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
