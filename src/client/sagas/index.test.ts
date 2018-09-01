import { rootSaga } from '.';

test('should register sagas', () => {
  const saga = rootSaga();

  expect(saga.next().value).toBeTruthy();
  expect(saga.next().value).toBeTruthy();
  expect(saga.next().value).toBeTruthy();
  expect(saga.next().value).toBeFalsy();
});
