import React from "react";
import { Redirect, Switch } from "react-router";
import { Router, Route } from "react-router-dom";
import history from "../history";
import { Paths } from "./types";
import { NotFound } from "./NotFound";
import { StyledRoutesContainer } from "./style";
import { Home } from "../../../home/pages/Home";
import { Liquidity } from "../../../liquidity/Liquidity";
import { Swap } from "../../../swap/Swap";
import { Nft } from "../../../nft/Nft";

const notFoundRoute: RouteDefinition = {
	path: "*",
	component: NotFound,
	protected: false,
	title: "",
};

export const routes: RouteDefinition[] = [
	{
		path: Paths.root,
		component: Home,
		protected: false,
		redirect: Paths.home,
		title: "Home",
		pathType: 0,
	},
	{
		path: Paths.home,
		component: Home,
		protected: false,
		redirect: Paths.home,
		title: "Home",
		pathType: 0,
	},
	{
		path: Paths.liquidity,
		component: Liquidity,
		protected: false,
		redirect: Paths.liquidity,
		title: "Swap",
		pathType: 0,
	},
	{
		path: Paths.swap,
		component: Swap,
		protected: false,
		redirect: Paths.swap,
		title: "Swap",
		pathType: 0,
	},
	{
		path: Paths.nft,
		component: Nft,
		protected: false,
		redirect: Paths.nft,
		title: "Swap",
		pathType: 0,
	},
].concat(notFoundRoute as any);

export interface RouteDefinition {
	path: string;
	protected?: boolean;
	redirect?: string;
	component?: any;
	routes?: RouteDefinition[];
	title?: string;
	pathType?: number;
}

interface Props {
	// userLoaded: boolean
}
interface RoutesProps {}

function getRouteRenderWithAuth(route: RouteDefinition, i: number) {
	return () => <route.component />;
}

const RoutesComponent: React.FC<Props & RoutesProps> = () => {
	const [activeLink, setActiveLink] = React.useState(history.location.pathname);

	return (
		<Router history={history}>
			<StyledRoutesContainer>
				<Switch>
					<Redirect exact from='/' to={Paths.home} />
					{routes.map((route, i) => {
						const render = getRouteRenderWithAuth(route, i);
						const rest = { render };
						return <Route key={i} path={route.path} exact {...rest} />;
					})}
				</Switch>
			</StyledRoutesContainer>
		</Router>
	);
};

export default RoutesComponent;
