import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import { rootReducer } from '../reducers';
import { Router } from '.';

let state: any;
let store: any;

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

  expect(toJson(tree)).toMatchSnapshot();
});

test('should render Orgs page', () => {
  const tree = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[{ pathname: '/orgs/test', key: 'testKey' }]}>
        <Router />
      </MemoryRouter>
    </Provider>
  );

  expect(toJson(tree)).toMatchSnapshot();
});

test('should render 404 page', () => {
  const tree = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[{ pathname: '/404', key: 'testKey' }]}>
        <Router />
      </MemoryRouter>
    </Provider>
  );

  expect(toJson(tree)).toMatchSnapshot();
});
