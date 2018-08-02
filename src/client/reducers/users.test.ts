import { reducer } from './users';

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toMatchSnapshot();
});

test('should handle SET_USER_NAME', () => {
  expect(
    reducer(undefined, {
      type: 'SET_USER_NAME',
      payload: {
        name: 'foo'
      }
    })
  ).toMatchSnapshot();
});
