import { call, put, takeLatest } from 'redux-saga/effects';
import { FetchRepos } from '../actions/orgs';
import { State } from '../reducers/orgs';
import * as octokit from '@octokit/rest';

const github = new octokit();

function* fetchRepos(action: FetchRepos) {
  try {
    const { org } = action.payload;

    const res = yield call(github.repos.getForOrg, { org });

    // octokit does not have response type
    const repos: State['repos'] = res.data.map((r: any) => ({
      forksCount: r.forks_count,
      name: r.name,
      url: r.html_url,
      language: r.language,
      issuesCount: r.open_issues_count,
      stargazersCount: r.stargazers_count,
      watchersCount: r.watchers_count
    }));

    if (res.status === 200) {
      yield put({
        type: 'FETCH_REPOS_SUCCESS',
        payload: {
          name: org,
          repos
        }
      });
    } else {
      throw new Error();
    }
  } catch (e) {
    yield put({
      type: 'ERROR',
      payload: {
        message: JSON.parse(e.message).message
      }
    });
  }
}

export function* orgsProcess() {
  yield takeLatest('FETCH_REPOS', fetchRepos);
}
