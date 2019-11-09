import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { rootReducer } from '../reducers';
import { Router } from '.';

let state: any;
let store: any;

jest.mock('./routes.ts', () => {
  return {
    LoadableTopPage: () => <p>top</p>,
    LoadableSagaPage: () => <p>saga</p>,
    LoadableApolloPage: () => <p>apollo</p>,
    LoadableNotFoundPage: () => <p>404</p>
  };
});

beforeEach(() => {
  state = createStore(rootReducer).getState();
  store = configureStore()(state);
});

test('should render Top page', () => {
  const tree = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
        <Router />
      </MemoryRouter>
    </Provider>
  );

  expect(tree.asFragment()).toMatchSnapshot();
});

test('should render Saga page', () => {
  const tree = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[{ pathname: '/saga', key: 'testKey' }]}>
        <Router />
      </MemoryRouter>
    </Provider>
  );

  expect(tree.asFragment()).toMatchSnapshot();
});

test('should render Apollo page', () => {
  const tree = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[{ pathname: '/apollo', key: 'testKey' }]}>
        <Router />
      </MemoryRouter>
    </Provider>
  );

  expect(tree.asFragment()).toMatchSnapshot();
});

test('should render 404 page', () => {
  const tree = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[{ pathname: '/noPath', key: 'testKey' }]}>
        <Router />
      </MemoryRouter>
    </Provider>
  );

  expect(tree.asFragment()).toMatchSnapshot();
});
