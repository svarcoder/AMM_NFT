import { imageUrl } from "../../../shared/utility";
import { FlexBox } from "../../../shared/flexBox";
import {
	SharedTitle,
	SharedDescription,
	SharedButton,
	SharedDetailBlock,
	SharedForum,
} from "../../../shared/shared";
import { exampleData, lineImage, pancakeImage } from "../utility";
import {
	CardComponent,
	HomeContainer,
	MoonComponent,
	MoonLeft,
	MoonLogo,
	MoonRight,
	TotalCardComponent,
	TotalGridComponent,
} from "./style";
import { Navbar } from "../../app/components/navbar/Navbar";
import { withTheme, ThemeProps } from "styled-components";
import { PageContainer } from "../../../styles/styled";
import lineSvg from "../../../assets/image/line.svg";
import { Card } from "../../../shared/card";
import { BasicGrid } from "../../../shared/basicGrid";

export const Home: React.FC = withTheme((props: ThemeProps<any>) => {
	const { theme } = props;

	return (
		<PageContainer>
			<Navbar />
			<HomeContainer>
				<MoonComponent>
					<MoonLeft>
						<SharedTitle>The moon is made of pancakes.</SharedTitle>
						<SharedDescription>
							Trade, earn, and win crypto on the most popular decentralized
							platform in the galaxy.
						</SharedDescription>
						<SharedButton>Trade Now</SharedButton>
					</MoonLeft>
					<MoonRight>
						<MoonLogo>
							<img src={pancakeImage} alt='' />
						</MoonLogo>
					</MoonRight>
				</MoonComponent>
				{/* <img src={lineSvg} alt='' /> */}
				{/* <CardComponent>
					<SharedTitle>
						Used by millions. <br />
						Trusted with billions.
					</SharedTitle>
					<SharedDescription>
						PancakeSwap has the most users of any decentralized platform, ever.
						<br />
						And those users are now entrusting the platform with over $12
						billion in funds.
					</SharedDescription>
				</CardComponent>
				<TotalCardComponent>
					<Card>
						<span>4 million users</span>
						<span>in the last 30 days</span>
					</Card>
					<Card>
						<span>4 million users</span>
						<span>in the last 30 days</span>
					</Card>
					<Card>
						<span>4 million users</span>
						<span>in the last 30 days</span>
					</Card>
					<Card>
						<span>4 million users</span>
						<span>in the last 30 days</span>
					</Card>
				</TotalCardComponent> */}
				{/* <TotalGridComponent>
					<BasicGrid>
						<p>Superpowers for DeFi developers.</p>
						<span>
							Build Defi apps and tools on the largest crypto project on
							Ethereum. Get started with quick start guides, protocol
							documentation, a Javascript SDK, and fully open source code.
						</span>
					</BasicGrid>
					<BasicGrid>
						<p>Superpowers for DeFi developers.</p>
						<span>
							Build Defi apps and tools on the largest crypto project on
							Ethereum. Get started with quick start guides, protocol
							documentation, a Javascript SDK, and fully open source code.
						</span>
					</BasicGrid>
				</TotalGridComponent> */}
			</HomeContainer>
		</PageContainer>
	);
});
