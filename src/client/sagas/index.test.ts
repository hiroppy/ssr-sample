import { rootSaga } from '.';

test('should register sagas', () => {
  expect((rootSaga().next().value as any).payload).toHaveLength(2);
});
