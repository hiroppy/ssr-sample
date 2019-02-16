import * as React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { App } from '.';

const mockStore = configureStore();
let store: any;
let wrapper: any;

beforeEach(() => {
  store = mockStore({
    users: {
      name: 'foo'
    }
  });
  store.dispatch = jest.fn();
  wrapper = shallow(<App>bar</App>, { context: { store } });
});

test('should map state and dispatch to props', () => {
  expect(wrapper.props()).toEqual(
    expect.objectContaining({
      name: 'foo',
      setUserName: expect.any(Function)
    })
  );
});

test('should map setUserName to dispatch SET_USER_NAME action', () => {
  wrapper.props().setUserName('foo');

  expect(store.dispatch).toHaveBeenCalledWith({
    type: 'SET_USER_NAME',
    payload: {
      name: 'foo'
    }
  });
});
