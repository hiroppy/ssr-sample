import * as actions from './pages';

test('should create an action to set a base-url', () => {
  expect(actions.setBaseUrl('url')).toMatchSnapshot();
});

test('should create an action to reset state', () => {
  expect(actions.resetPageStatus()).toMatchSnapshot();
});

test('should create an action to load app process', () => {
  expect(actions.loadAppProcess()).toMatchSnapshot();
});

test('should create a success action to load app process', () => {
  expect(actions.loadAppProcessSuccess()).toMatchSnapshot();
});

test('should create a failure action to load app process', () => {
  expect(actions.loadAppProcessFailure(new Error())).toMatchSnapshot();
});

test('should create an action to load Top page', () => {
  expect(actions.loadTopPage()).toMatchSnapshot();
});

test('should create a success action to load Top page', () => {
  expect(actions.loadTopPageSuccess()).toMatchSnapshot();
});

test('should create a failure action to load Top page', () => {
  expect(actions.loadTopPageFailure(new Error())).toMatchSnapshot();
});

test('should create an action to load Saga page', () => {
  expect(actions.loadSagaPage('2')).toMatchSnapshot();
});

test('should create a success action to load Saga page', () => {
  expect(actions.loadSagaPageSuccess()).toMatchSnapshot();
});

test('should create a failure action to load Saga page', () => {
  expect(actions.loadSagaPageFailure(new Error())).toMatchSnapshot();
});

test('should create an action to load Apollo page', () => {
  expect(actions.loadApolloPage()).toMatchSnapshot();
});

test('should create a success action to load Apollo page', () => {
  expect(actions.loadApolloPageSuccess()).toMatchSnapshot();
});

test('should create a failure action to load Apollo page', () => {
  expect(actions.loadApolloPageFailure(new Error())).toMatchSnapshot();
});
