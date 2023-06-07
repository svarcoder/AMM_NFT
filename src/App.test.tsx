import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
// import { store } from './app/store';
import { App } from "./modules/app/pages";

test("renders learn react link", () => {
	render(<App />);
	const linkElement = screen.getByText(/learn react/i);
	expect(linkElement).toBeInTheDocument();
});
