import * as sinon from 'sinon';
import { END } from 'redux-saga';
import { configureStore } from './configureStore';

afterEach(() => {
  process.env.NODE_ENV = 'test';
  jest.resetModules();
});

test('should set the root reducer, runSaga, and close', () => {
  const rootReducer = jest.fn();
  const store = configureStore(rootReducer());

  expect(rootReducer).toHaveBeenCalled();
  expect(store).toHaveProperty('runSaga');
  expect(store).toHaveProperty('close');
});

test('should call CHANNEL_END of redux-saga', () => {
  const dispatch = sinon.spy();
  const store = configureStore();
  store.dispatch = dispatch;

  store.close();

  expect(dispatch.lastCall.lastArg).toEqual(END);
});
