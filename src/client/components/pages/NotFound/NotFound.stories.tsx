import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NotFound from '.';
import { initialState } from '../../../reducers';

export default {
  component: NotFound,
  title: 'NotFound',
};

const store = configureStore()(initialState);

export const Base = () => (
  <Provider store={store}>
    <NotFound />
  </Provider>
);
