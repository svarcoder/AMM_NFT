import "./App.css";

import { ThemeProvider } from "styled-components";
import { getTheme, Themes } from "../../../styles/theme";
import { GlobalStyle } from "../../../styles/global";
import RoutesComponent from "../components/routes/Routes";

export const App = () => {
	const currentTheme = { ...getTheme(Themes.BASIC), selected: Themes.BASIC };

	return (
		<ThemeProvider theme={currentTheme}>
			<GlobalStyle />
			<RoutesComponent />
		</ThemeProvider>
	);
};
