import { render, screen } from '@testing-library/react';
import { Product } from './Product';

const productExample = {
  id: 5,
  image: './images/deuter-aircontact-blue.jpg',
  name: 'Deuter Aircontact',
  brand: 'Deuter',
  volume: 75,
  color: 'blue',
  weight: 2450,
  price: 5690,
  popular: 'yes',
  storage: 3,
};

describe('Product component', () => {
  test('Product renders', () => {
    render(
      <Product
        image={productExample.image}
        name={productExample.name}
        brand={productExample.brand}
        volume={productExample.volume}
        color={productExample.color}
        weight={productExample.weight}
        price={productExample.price}
        popular={productExample.popular}
        storage={productExample.storage}
      />
    );

    expect(screen.getByTestId('product')).toBeInTheDocument();
  });

  test('ProductList snapshot', () => {
    const product = render(
      <Product
        image={productExample.image}
        name={productExample.name}
        brand={productExample.brand}
        volume={productExample.volume}
        color={productExample.color}
        weight={productExample.weight}
        price={productExample.price}
        popular={productExample.popular}
        storage={productExample.storage}
      />
    );

    expect(product).toMatchSnapshot;
  });
});
