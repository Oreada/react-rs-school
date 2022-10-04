import React, { ReactNode } from 'react';
import { products } from '../data/products';
import { IProduct, Product } from './Product';

export class ProductList extends React.Component {
  render(): ReactNode {
    return (
      <>
        {products.map((product: IProduct) => (
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
      </>
    );
  }
}
