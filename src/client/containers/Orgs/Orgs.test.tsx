import * as React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import Orgs from '.';

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
      repos: [],
      isFetching: false
    },
    pages: {
      error: null
    }
  });
  store.dispatch = jest.fn();
  wrapper = shallow(
    <Orgs history={history} location={location} match={match}>
      bar
    </Orgs>,
    { context: { store } }
  );
});

test('should map state and dispatch to props', () => {
  expect(wrapper.props()).toEqual(
    expect.objectContaining({
      name: 'foo',
      repos: [],
      isFetchingRepos: false,
      error: null
    })
  );
});

test('should map load to dispatch LOAD_ORGS_PAGE action', () => {
  wrapper.props().load('foo');

  expect(store.dispatch).toHaveBeenCalledWith({
    type: 'LOAD_ORGS_PAGE',
    payload: {
      org: 'foo'
    }
  });
});
