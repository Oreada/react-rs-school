import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

export class Navigation extends React.Component {
	render(): ReactNode {
		return (
			<nav className="h-[50px] flex justify-between items-center px-5 bg-lime-900 text-white">
				<span className="font-bold">RS-SCHOOL REACT</span>
				<span>
					<Link to="/" className="mr-5">Home</Link>
					<Link to="/about">About</Link>
				</span>
			</nav>
		)

	}
}
