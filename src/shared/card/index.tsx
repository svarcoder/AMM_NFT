import SellNFT from "../sell-nft";
import {
	CardWrapper,
	CardHeader,
	CardBody,
	LeftHead,
	RightHead,
	CardImg,
	CardFooter,
	LeftFoot,
	RightFoot,
	CardButton,
	BurnButton,
	BuyButton,
} from "./style";

interface GridProps {
	userName?: String | any;
	onSale?: String;
	img?: any;
	title?: String;
	price?: String;
	burnFunction?: any;
	buyFunction?: any;
	allURI?: any;
	activeButton?: any;
}

export const Card = (props: GridProps) => {
	const {
		userName,
		onSale,
		img,
		title,
		price,
		burnFunction,
		buyFunction,
		allURI,
		activeButton,
	} = props;
	return (
		<CardWrapper>
			<CardHeader>
				<LeftHead>{userName}</LeftHead>
				<RightHead>{onSale}</RightHead>
			</CardHeader>

			<CardBody>
				<CardImg>
					<img src={img} alt='Nothing' />
				</CardImg>
				<CardFooter>
					<LeftFoot>{title}</LeftFoot>
					<RightFoot>{price}</RightFoot>
				</CardFooter>
			</CardBody>
			<CardButton>
				{activeButton === true ? (
					<BuyButton onClick={() => buyFunction(img)}>Buy</BuyButton>
				) : (
					<>
						<BurnButton onClick={() => burnFunction(img)}>Delete</BurnButton>
						<SellNFT closeWalletModal={() => null} allURI={allURI} id={img} />
					</>
				)}
			</CardButton>
		</CardWrapper>
	);
};
