import React, { ReactNode } from 'react';
import { IProduct, Product } from './Product';

interface ProductListProps {
  data: Array<IProduct>;
}

export class ProductList extends React.Component<ProductListProps> {
  constructor(props: ProductListProps) {
    super(props);
  }

  render(): ReactNode {
    return (
      <div className="products__list" data-testid="products-list">
        {this.props.data.map((product: IProduct) => (
          <Product
            key={product.id}
            image={product.image}
            name={product.name}
            brand={product.brand}
            volume={product.volume}
            color={product.color}
            weight={product.weight}
            price={product.price}
            popular={product.popular}
            storage={product.storage}
          />
        ))}
      </div>
    );
  }
}
