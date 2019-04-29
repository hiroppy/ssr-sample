import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { App } from '.';

const stories = storiesOf('components/App', module);

const mockStore = configureMockStore();
const store = mockStore({
  users: {
    name: 'users.name'
  },
  orgs: {
    name: 'orgs.name'
  }
});

stories.add('default', () => (
  <Provider store={store}>
    <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
      <App load={() => {}}>body</App>
    </MemoryRouter>
  </Provider>
));
