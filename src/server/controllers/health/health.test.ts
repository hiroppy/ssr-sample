import * as sinon from 'sinon';
import { get } from '.';

test('should return the get of health api response', () => {
  const req: any = {};
  const res: any = {
    json: sinon.spy()
  };

  get(req, res);

  expect(res.json.calledOnce).toBeTruthy();
  expect(res.json.getCall(0).args[0]).toMatchSnapshot();
});
