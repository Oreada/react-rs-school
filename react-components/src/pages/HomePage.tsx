import React from 'react';
import { ReactNode } from 'react';
import { ProductList } from '../components/ProductsList';
import { SearchBar } from '../components/SearchBar';

export class HomePage extends React.Component {
  render(): ReactNode {
    return (
      <main className="main">
        <SearchBar />
        <div className="products__list">
          <ProductList />
        </div>
      </main>
    );
  }
}
