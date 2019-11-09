import * as actions from './fetchSaga';
import { sagaSamples } from '../../server/responseSchema';

test("should create an action to fetch saga's code", () => {
  expect(actions.fetchSagaCode('2')).toMatchSnapshot();
});

test("should create a success action to fetch saga's code", () => {
  expect(actions.fetchSagaCodeSuccess(sagaSamples)).toMatchSnapshot();
});

test("should create a failure action to fetch saga's code", () => {
  expect(actions.fetchSagaCodeFailure(new Error())).toMatchSnapshot();
});

test('should create an action to add like count', () => {
  expect(actions.addLike(1)).toMatchSnapshot();
});

test('should create a success action to add like count', () => {
  expect(actions.addLikeSuccess(sagaSamples[0])).toMatchSnapshot();
});

test('should create a failure action to add like count', () => {
  expect(actions.addLikeFailure(new Error())).toMatchSnapshot();
});
