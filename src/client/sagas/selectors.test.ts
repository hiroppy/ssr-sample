import { createStore } from 'redux';
import * as selectors from './selectors';
import { rootReducer } from '../reducers';

test('should get orgs state', () => {
  const storeState = createStore(rootReducer).getState();

  expect(selectors.getOrgs(storeState as any)).toMatchSnapshot();
});
