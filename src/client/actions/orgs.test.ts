import * as actions from './orgs';

test('should create an action to fetch repositories', () => {
  expect(actions.fetchRepos('foo')).toMatchSnapshot();
});

test('should create a successful action to fetch repositories', () => {
  expect(
    actions.fetchReposSuccess({
      name: 'foo',
      repos: []
    })
  ).toMatchSnapshot();
});

test('should create a failure action to fetch repositories', () => {
  expect(actions.fetchReposFailure(new Error())).toMatchSnapshot();
});

test('should create an action to reset state', () => {
  expect(actions.resetOrgs()).toMatchSnapshot();
});
