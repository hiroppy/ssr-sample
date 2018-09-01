import { expectSaga } from 'redux-saga-test-plan';
import { orgsProcess } from './orgs';
import * as nock from 'nock';

const initialState = {
  name: 'name',
  repos: []
};

test('should take on the FETCH_REPOS action', () => {
  nock('https://api.github.com')
    .get('/orgs/test/repos')
    .reply(200, [
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
    ]);

  return expectSaga(orgsProcess)
    .withState(initialState)
    .put({
      type: 'FETCH_REPOS_SUCCESS',
      payload: {
        name: 'test',
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
      }
    })
    .dispatch({
      type: 'FETCH_REPOS',
      payload: {
        org: 'test'
      }
    })
    .run();
});

test('should take on the ERROR action when FETCH_REPOS fails', () => {
  nock('https://api.github.com')
    .get('/orgs/test/repos')
    .reply(404, {
      message: 'not found'
    });

  return expectSaga(orgsProcess)
    .withState(initialState)
    .put({
      type: 'FETCH_REPOS_FAILURE',
      payload: {
        code: 404
      }
    })
    .dispatch({
      type: 'FETCH_REPOS',
      payload: {
        org: 'test'
      }
    })
    .run();
});
