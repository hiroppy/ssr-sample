import * as React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { App } from '.';
import { loadAppProcess } from '../../actions/pages';

const mockStore = configureStore();
let store: any;
let wrapper: any;

beforeEach(() => {
  store = mockStore({});
  store.dispatch = jest.fn();
  wrapper = shallow(<App>bar</App>, { context: { store } });
});

test('should map state and dispatch to props', () => {
  expect(wrapper.props()).toEqual(
    expect.objectContaining({
      load: expect.any(Function)
    })
  );
});

test('should map load to dispatch LOAD action', () => {
  wrapper.props().load();
  expect(store.dispatch).toHaveBeenCalledWith(loadAppProcess());
});
