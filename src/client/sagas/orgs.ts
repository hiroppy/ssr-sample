import { call, put, takeLatest } from 'redux-saga/effects';
import { FetchRepos, fetchReposSuccess, fetchReposFailure } from '../actions/orgs';
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

    yield put(fetchReposSuccess({ name: org, repos }));
  } catch (e) {
    yield put(fetchReposFailure(e.code));
  }
}

export function* orgsProcess() {
  yield takeLatest('FETCH_REPOS', fetchRepos);
}
