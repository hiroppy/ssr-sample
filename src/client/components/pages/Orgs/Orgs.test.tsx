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

// https://github.com/airbnb/enzyme/issues/1213
test.skip('should render self and sub-components', () => {
  const mock: any = jest.fn();
  const tree = mount(
    <Orgs
      error={null}
      name="foo"
      repos={repos}
      match={match}
      location={mock}
      load={() => {}}
      history={mock}
      isFetchingRepos
    />
  );

  expect(toJson(tree)).toMatchSnapshot();
});

test('should show loader', () => {
  process.env.IS_BROWSER = 'true';

  const mock: any = jest.fn();
  const tree = shallow(
    <Orgs
      error={null}
      name=""
      repos={repos}
      match={match}
      location={mock}
      history={mock}
      load={() => {}}
      isFetchingRepos={true}
    />
  );

  expect(toJson(tree)).toMatchSnapshot();

  delete process.env.IS_BROWSER;
});

test('should call load', () => {
  const mock: any = jest.fn();
  const load = sinon.spy();

  mount(
    <Orgs
      error={null}
      name=""
      repos={repos}
      match={match}
      location={mock}
      history={mock}
      load={load}
      isFetchingRepos
    />
  );

  expect(load.calledOnce).toBeTruthy();
});
