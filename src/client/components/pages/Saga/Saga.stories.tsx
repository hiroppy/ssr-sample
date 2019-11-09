import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import Saga from '.';
import { initialState } from '../../../reducers';
import { sagaSamples } from '../../../../server/responseSchema';

export default {
  component: Saga,
  title: 'Saga'
};

const store = configureStore()({ ...initialState, sagaPage: { samples: sagaSamples } });

export const Base = () => (
  <Provider store={store}>
    <MemoryRouter initialEntries={['/saga']} keyLength={0}>
      <Saga />
    </MemoryRouter>
  </Provider>
);
