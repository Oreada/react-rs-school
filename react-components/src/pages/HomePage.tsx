import React from 'react';
import { ReactNode } from 'react';
import { ProductList } from '../components/ProductsList';
import { SearchBar } from '../components/SearchBar';
import { PRODUCTS } from '../data/products';

export class HomePage extends React.Component {
  render(): ReactNode {
    return (
      <main className="home-page">
        <SearchBar />
        <ProductList data={PRODUCTS} />
      </main>
    );
  }
}
