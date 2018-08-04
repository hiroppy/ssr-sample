import * as express from 'express';
import { router } from './router';

test('should register url paths', () => {
  const app = express();

  router(app);

  const res = app._router.stack.map((r) => {
    return {
      name: r.name,
      path: r.regexp
    };
  });

  expect(res).toMatchSnapshot();
});
