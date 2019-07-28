import * as React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import NotFound from '.';

const mockStore = configureStore();
let store: any;
let wrapper: any;

beforeEach(() => {
  store = mockStore({});
  store.dispatch = jest.fn();
  wrapper = shallow(<NotFound>bar</NotFound>, { context: { store } });
});

test('should map load to dispatch STOP_SAGA action', () => {
  wrapper.props().stopSaga();

  expect(store.dispatch).toHaveBeenCalledWith({ type: 'STOP_SAGA' });
});
