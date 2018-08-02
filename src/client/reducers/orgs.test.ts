import { reducer } from './orgs';

const customState = {
  name: 'foo',
  repos: [
    {
      url: 'url',
      name: 'name',
      language: 'lang',
      forksCount: 100,
      issuesCount: 200,
      stargazersCount: 300,
      watchersCount: 400
    }
  ]
};

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toMatchSnapshot();
});

test('should handle FETCH_REPOS_SUCCESS', () => {
  expect(
    reducer(undefined, {
      type: 'FETCH_REPOS_SUCCESS',
      payload: { ...customState }
    })
  ).toMatchSnapshot();
});

test('should handle RESET_ORGS', () => {
  expect(
    reducer(
      { ...customState },
      {
        type: 'RESET_ORGS'
      }
    )
  ).toMatchSnapshot();
});
