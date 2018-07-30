import * as octokit from '@octokit/rest';

export async function fetchRepo({ owner, repo }: { owner: string; repo: string }) {
  const o = new octokit();

  const res = await o.repos.get({
    owner,
    repo
  });

  const {
    forks_count: forksCount,
    full_name: fullName,
    homepage,
    html_url: url,
    language,
    open_issues_count: issuesCount,
    stargazers_count: stargazersCount,
    subscribers_count: subscribersCount,
    watchers_count: watchersCount
  } = res.data;

  return {
    forksCount,
    fullName,
    homepage,
    url,
    language,
    issuesCount,
    stargazersCount,
    subscribersCount,
    watchersCount,
    status: res.status
  };
}
