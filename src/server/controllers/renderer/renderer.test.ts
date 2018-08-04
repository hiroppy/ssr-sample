import * as sinon from 'sinon';
import { get } from '.';

test('should return the get of renderer response', () => {
  const req: any = {};
  const res: any = {
    send: sinon.spy()
  };

  get(req, res);

  expect(res.json.calledOnce).toBeTruthy();
  // expect(res.json.getCall(0).args[0]).toMatchSnapshot();
});
