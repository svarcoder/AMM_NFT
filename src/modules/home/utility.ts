import lineSvg from "../../assets/image/line.svg";

interface Data {
	title: string;
	description: string;
}

export const exampleData: Data[] = [
	{
		title: "$730B+",
		description: "Trade Volume",
	},
	{
		title: "$67M+",
		description: "All Time Trades",
	},
	{
		title: "300+",
		description: "Integrations",
	},
	{
		title: "4,400+",
		description: "Community Delegates",
	},
];

export const pancakeImage =
	"https://pancakeswap.finance/images/home/lunar-bunny/bunny@2x.webp";
export const lineImage = { lineSvg };
