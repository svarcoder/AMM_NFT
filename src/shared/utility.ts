export const imageUrl =
	"https://t4.ftcdn.net/jpg/03/34/21/29/360_F_334212907_oPzoqRR89QKPYwnYn2xhxxBcTYARoy6T.jpg";
const { InjectedConnector } = require("@web3-react/injected-connector");
const injected = new InjectedConnector();

export const switchNet = async () => {
	var provider = await injected.getProvider();

	const TESTNET_PARAMS = {
		chainId: "0x61",
		chainName: "Binance Smart Chain Testnet",
		nativeCurrency: {
			name: "Binance Smart Chain Testnet",
			symbol: "BNB",
			decimals: 18,
		},
		rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
		blockExplorerUrls: ["https://testnet.bscscan.com/"],
	};

	return provider
		.request({
			method: "wallet_addEthereumChain",
			params: [TESTNET_PARAMS],
		})
		.then(async (onResolved: any, onRejected: any) => {
			console.log({ onResolved });
			console.log({ onRejected });
		})
		.catch((error: any) => {
			console.log(error);
			return false;
		});
};
