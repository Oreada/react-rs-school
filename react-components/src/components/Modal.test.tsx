import { render, screen } from '@testing-library/react';
import { Details } from './Details';
import { detailsExample } from './Details.test';
import { Modal } from './Modal';

const changeModalState: (newModal: boolean) => void = jest.fn();

describe('Modal component', () => {
  test('Modal renders', () => {
    render(
      <Modal title="Details of artwork" onClose={changeModalState}>
        <Details data={detailsExample} />
      </Modal>
    );

    expect(screen.getByTestId('modal-main')).toBeInTheDocument();
  });
});
