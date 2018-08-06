import * as sinon from 'sinon';
import styleSheet from 'styled-components/lib/models/StyleSheet';
import { get } from '.';

beforeEach(() => {
  styleSheet.reset(true);
});

// https://github.com/styled-components/styled-components/issues/811
test.skip('should return the get of renderer response', () => {
  const req: any = {
    url: '/'
  };
  const res: any = {
    send: sinon.spy(),
    status: {
      send: () => {}
    }
  };

  get(req, res);

  expect(res.json.calledOnce).toBeTruthy();
  // expect(res.json.getCall(0).args[0]).toMatchSnapshot();
});
