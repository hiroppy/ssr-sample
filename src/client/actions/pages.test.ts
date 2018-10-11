import * as actions from './pages';

test('should create an action to reset state', () => {
  expect(actions.resetPageStatus()).toMatchSnapshot();
});

test('should create an action to load Top page', () => {
  expect(actions.loadTopPage()).toMatchSnapshot();
});

test('should create a success action to load Top page', () => {
  expect(actions.loadTopPageSuccess()).toMatchSnapshot();
});

test('should create a failure action to load Top page', () => {
  expect(actions.loadTopPageFailure()).toMatchSnapshot();
});

test('should create an action to load Orgs page', () => {
  expect(actions.loadOrgsPage('foo')).toMatchSnapshot();
});

test('should create a success action to load Orgs page', () => {
  expect(actions.loadOrgsPageSuccess()).toMatchSnapshot();
});

test('should create a failure action to load Orgs page', () => {
  expect(actions.loadOrgsPageFailure()).toMatchSnapshot();
});

test('should create an action to stop saga', () => {
  expect(actions.stopSaga()).toMatchSnapshot();
});
