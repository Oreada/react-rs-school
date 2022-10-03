import React, { ReactNode } from "react";

export interface IProduct {
	id?: number; //! пока использую только для key
	image: string;
	name: string;
	brand: string;
	volume: number;
	color: string;
	weight: number;
	price: number;
	popular: string;
	storage: number;
}

// interface ProductProps {
// 	product: IProduct;
// }

export class Product extends React.Component<IProduct> {
	// constructor(props: IProduct) {
	// 	super(props);
	// }

	render(): ReactNode {
		return (
			<div className="product">
				<div className="product__box">
					<div className="product__picture">
						<img src={this.props.image} alt="Backpack" className="product__image" />
					</div>
					<div className="product__info">
						<div className="product__price">{this.props.price} MDL</div>
						<div className="product__title">{this.props.name}</div>
						<div className="product__volume">Volume: {this.props.volume} L</div>
						<div className="product__weight">Weight: {this.props.weight} g</div>
						<div className="product__storage">Storage: {this.props.storage}</div>
						<div className="product__popular">Popular: {this.props.popular}</div>
					</div>
					<div className="product__buttons-wrapper">
						<button className="product__button product__button_add">Add to cart</button>
						<button className="product__button product__button_remove">Remove from cart</button>
					</div>
				</div>
			</div>
		)
	}
}
