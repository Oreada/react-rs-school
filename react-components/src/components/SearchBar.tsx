import React, { ReactNode } from "react";

export class SearchBar extends React.Component {
	render(): ReactNode {
		return (
			<form role="search" method="get" className="search-form form" action="">
				<label>
					<span className="screen-reader-text">Search for...</span>
					<input type="search" className="search-field" placeholder="Search..." value="" name="s" title="" />
				</label>
				<input type="submit" className="search-submit button" value="" />
			</form>
		)

	}
}
