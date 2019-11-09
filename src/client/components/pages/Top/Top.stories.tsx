import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Top from '.';
import { initialState } from '../../../reducers';

export default {
  component: Top,
  title: 'Top'
};

const store = configureStore()(initialState);

export const Base = () => (
  <Provider store={store}>
    <Top />
  </Provider>
);
