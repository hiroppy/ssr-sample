import { rootSaga } from '.';

test('should register sagas', () => {
  expect(rootSaga().next().value.payload).toHaveLength(2);
});
