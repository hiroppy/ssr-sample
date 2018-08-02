import * as React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as sinon from 'sinon';
import { Orgs } from '.';

const match = {
  params: {
    org: 'org'
  },
  isExact: true,
  path: '/',
  url: ''
};

const repos = [
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
    forksCount: 1000,
    name: 'bar',
    url: 'url',
    language: 'lang',
    issuesCount: 2000,
    stargazersCount: 3000,
    watchersCount: 4000
  }
];

test('should render self and sub-components', () => {
  const mock: any = jest.fn();
  const tree = mount(
    <Orgs
      name="foo"
      repos={repos}
      match={match}
      location={mock}
      fetchRepos={() => {}}
      resetOrgs={() => {}}
      history={mock}
    />
  );

  expect(toJson(tree)).toMatchSnapshot();
});

test('should call fetchRepos if name is empty', () => {
  const mock: any = jest.fn();
  const fetchRepos = sinon.spy();

  shallow(
    <Orgs
      name=""
      repos={repos}
      match={match}
      location={mock}
      fetchRepos={fetchRepos}
      resetOrgs={() => {}}
      history={mock}
    />
  );

  expect(fetchRepos.calledOnce).toBeTruthy();
});

test('should call resetOrgs when unmounted', () => {
  const mock: any = jest.fn();
  const resetRepos = sinon.spy();

  const tree = shallow(
    <Orgs
      name=""
      repos={repos}
      match={match}
      location={mock}
      fetchRepos={() => {}}
      resetOrgs={resetRepos}
      history={mock}
    />
  );

  tree.unmount();

  expect(resetRepos.calledOnce).toBeTruthy();
});
