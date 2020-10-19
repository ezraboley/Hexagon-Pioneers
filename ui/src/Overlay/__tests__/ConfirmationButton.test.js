import React from 'react';
import { render } from '@testing-library/react';
import ConfirmationButton from '../ConfirmationButton';

const defaultProps = { 
  action: 'test_action',
  data: "test_data" ,
};


it('renders with correct text', () => {
    const { queryByText } = render(<ConfirmationButton {...defaultProps} />);
    expect(queryByText("Confirm")).toBeTruthy(); 
  });