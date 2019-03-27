import { expectSaga } from 'redux-saga-test-plan';
import { orgsProcess } from './orgs';
import { fetchRepos, fetchReposSuccess, fetchReposFailure } from '../actions/orgs';

test('should take on the FETCH_REPOS action', () => {
  const res = [
    {
      forks_count: 100,
      name: 'foo',
      html_url: 'url',
      language: 'lang',
      open_issues_count: 200,
      stargazers_count: 300,
      watchers_count: 400
    },
    {
      forks_count: 100,
      name: 'bar',
      html_url: 'url',
      language: 'lang',
      open_issues_count: 200,
      stargazers_count: 300,
      watchers_count: 400
    }
  ];

  return expectSaga(orgsProcess)
    .provide({
      call: () => ({
        data: res
      })
    })
    .put(
      fetchReposSuccess({
        name: 'foo',
        repos: [
          {
            forksCount: 100,
            name: 'foo',
            url: 'url',
            language: 'lang',
            issuesCount: 200,
            stargazersCount: 300,
            watchersCount: 400
          },
          {
            forksCount: 100,
            name: 'bar',
            url: 'url',
            language: 'lang',
            issuesCount: 200,
            stargazersCount: 300,
            watchersCount: 400
          }
        ]
      })
    )
    .dispatch(fetchRepos('foo'))
    .silentRun();
});

test('should take on the ERROR action when FETCH_REPOS fails', () => {
  return expectSaga(orgsProcess)
    .provide({
      call: () => {
        throw new Error();
      }
    })
    .put(fetchReposFailure(new Error()))
    .dispatch(fetchRepos('foo'))
    .silentRun();
});
