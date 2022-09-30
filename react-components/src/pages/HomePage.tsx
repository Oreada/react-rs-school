import React from "react";
import { ReactNode } from "react";
import { SearchBar } from "../components/SearchBar";

export class HomePage extends React.Component {
	render(): ReactNode {
		return (
			<main className="main">
				This is the Home page
				<SearchBar />
			</main>
		)
	}
}
