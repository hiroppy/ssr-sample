import React from 'react';
import { render, getAllByTestId, fireEvent } from '@testing-library/react';
import { CodeSamplesBox } from '.';
import { sagaSamples } from '../../../server/responseSchema';

test('should handle collapse event', () => {
  const { container } = render(<CodeSamplesBox samples={sagaSamples} addLike={jest.fn()} />);
  const [box] = getAllByTestId(container, 'collapse-button');

  expect(box.textContent).toEqual('open');

  fireEvent.click(box);

  expect(box.textContent).toEqual('close');
});

test('should handle like callback', () => {
  const addLike = jest.fn();
  const { container } = render(<CodeSamplesBox samples={sagaSamples} addLike={addLike} />);
  const [box] = getAllByTestId(container, 'like-button');

  fireEvent.click(box);

  expect(addLike).toBeCalled();
});
