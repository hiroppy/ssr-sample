import * as React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { Orgs } from '.';

const mockStore = configureStore();
const match: any = jest.fn();
const history: any = jest.fn();
const location: any = jest.fn();
let store: any;
let wrapper: any;

beforeEach(() => {
  store = mockStore({
    orgs: {
      name: 'foo',
      repos: []
    }
  });
  store.dispatch = jest.fn();
  wrapper = shallow(
    <Orgs store={store} history={history} location={location} match={match}>
      bar
    </Orgs>
  );
});

test('should map state and dispatch to props', () => {
  expect(wrapper.props()).toEqual(
    expect.objectContaining({
      name: 'foo',
      repos: []
    })
  );
});

test('should map fetchRepos to dispatch FETCH_REPOS action', () => {
  wrapper.props().fetchRepos('foo');

  expect(store.dispatch).toHaveBeenCalledWith({
    type: 'FETCH_REPOS',
    payload: {
      org: 'foo'
    }
  });
});

test('should map resetOrgs to dispatch RESET_ORGS action', () => {
  wrapper.props().resetOrgs();

  expect(store.dispatch).toHaveBeenCalledWith({
    type: 'RESET_ORGS'
  });
});
