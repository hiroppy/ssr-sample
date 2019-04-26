import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Href } from 'history';
import { RouteComponentProps } from 'react-router-dom';
import Chance from 'chance';
import { Orgs } from '.';

const stories = storiesOf('components/pages/Orgs', module);

function getMockRouterProps<P>(data: P) {
  const location = {
    hash: '',
    key: '',
    pathname: '',
    search: '',
    state: {}
  };

  const props: RouteComponentProps<P> = {
    match: {
      isExact: true,
      params: data,
      path: '',
      url: ''
    },
    location,
    history: {
      length: 2,
      action: 'POP',
      location,
      push: () => {},
      replace: () => {},
      go: (num) => {},
      goBack: () => {},
      goForward: () => {},
      block: (t): any => null, // UnregisterCallback
      createHref: (t): Href => '',
      listen: (t): any => null // UnregsiterCallback
    },
    staticContext: {}
  };

  return props;
}

const chance = new Chance();

const repos = [...new Array(30)].map(() => ({
  url: '',
  name: chance.word(),
  language: chance.string(),
  forksCount: chance.integer({ min: 0, max: 1000 }),
  issuesCount: chance.integer({ min: 0, max: 1000 }),
  stargazersCount: chance.integer({ min: 0, max: 30000 }),
  watchersCount: chance.integer({ min: 0, max: 1000 })
}));

const props = getMockRouterProps({
  org: 'storybook'
});

stories.add('default', () => (
  <div
    style={{
      width: '80%',
      margin: '50px auto',
      background: '#f5f5f5'
    }}
  >
    <Orgs
      error={null}
      name="org"
      repos={repos}
      load={() => {}}
      isFetchingRepos={false}
      {...props}
    />
  </div>
));
