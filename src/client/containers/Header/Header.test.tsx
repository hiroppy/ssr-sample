import * as React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { Header } from '.';

const mockStore = configureStore();
let store: any;
let wrapper: any;

beforeEach(() => {
  store = mockStore({
    users: {
      name: 'foo'
    },
    orgs: {
      name: 'bar'
    }
  });
  store.dispatch = jest.fn();
  wrapper = shallow(<Header>bar</Header>, { context: { store } });
});

test('should map state and dispatch to props', () => {
  expect(wrapper.props()).toEqual(
    expect.objectContaining({
      userName: 'foo',
      orgName: 'bar'
    })
  );
});
