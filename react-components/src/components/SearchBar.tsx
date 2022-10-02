import React, { ReactNode } from "react";

interface SearchBarState {
	value: string;
}

export class SearchBar extends React.Component<Record<string, never>, SearchBarState> {
	constructor(props: Record<string, never>) {
		super(props);
		this.state = { value: '' };
	}
	changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ value: event.target.value });
	}

	render(): ReactNode {
		return (
			<form role="search" method="get" className="search-form form" action="">
				<label>
					<span className="screen-reader-text">Search for...</span>
					<input
						type="search"
						className="search-field"
						placeholder="Search..."
						autoComplete="off"
						value={this.state.value}
						name="search"
						onChange={this.changeHandler} />
				</label>
				<input type="submit" className="search-submit button" value="" />
			</form>
		)
	}
}
