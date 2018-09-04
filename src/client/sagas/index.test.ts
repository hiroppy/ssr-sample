import { rootSaga } from '.';

test('should register sagas', () => {
  expect(rootSaga().next().value.ALL).toHaveLength(3);
});
