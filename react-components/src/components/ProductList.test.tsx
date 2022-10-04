import { render, screen } from '@testing-library/react';
import { ProductList } from './ProductsList';

const data = [
  {
    id: 3,
    image: './images/blackdiamond-bullet-blue.jpg',
    name: 'Black Diamond Bullet',
    brand: 'BlackDiamond',
    volume: 16,
    color: 'blue',
    weight: 525,
    price: 1320,
    popular: 'yes',
    storage: 5,
  },
  {
    id: 4,
    image: './images/deuter-aclite-blue.jpg',
    name: 'Deuter AC Lite',
    brand: 'Deuter',
    volume: 23,
    color: 'blue',
    weight: 920,
    price: 1990,
    popular: 'no',
    storage: 1,
  },
];

describe('ProductList component', () => {
  test('ProductList renders', () => {
    render(<ProductList data={data} />);

    expect(screen.getByTestId('products-list')).toBeInTheDocument();
    expect(screen.getByText(/Deuter/)).toBeInTheDocument();
  });

  test('ProductList snapshot', () => {
    const list = render(<ProductList data={data} />);

    expect(list).toMatchSnapshot;
  });
});
