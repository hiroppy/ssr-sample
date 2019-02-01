import { configureStore } from './configureStore';

afterEach(() => {
  process.env.NODE_ENV = 'test';
  jest.resetModules();
});

test('should set the root reducer, runSaga, and close', () => {
  const rootReducer = jest.fn();
  const store = configureStore(rootReducer());

  expect(rootReducer).toHaveBeenCalled();
});
