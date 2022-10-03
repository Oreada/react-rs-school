import React from "react";
import { ReactNode } from "react";
import { Product } from "../components/Product";
import { SearchBar } from "../components/SearchBar";
import { products } from "../data/products";

export class HomePage extends React.Component {
	render(): ReactNode {
		return (
			<main className="main">
				<SearchBar />
				<div className="products__list">
					{products.map((product) => <Product
						key={product.id}
						image={product.image}
						name={product.name}
						brand={product.brand}
						volume={product.volume}
						color={product.color}
						weight={product.weight}
						price={product.price}
						popular={product.popular}
						storage={product.storage} />)}
				</div>
			</main>
		)
	}
}
