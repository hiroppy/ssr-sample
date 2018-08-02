import * as actions from './users';

test('should create an action to set username', () => {
  expect(actions.setUserName('foo')).toMatchSnapshot();
});
