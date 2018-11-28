import { get } from '.';

test('should return the get of health api response', () => {
  const req: any = {};
  const res: any = {
    json: jest.fn()
  };

  get(req, res);

  expect(res.json).toHaveBeenCalled();
  expect(res.json.mock.calls[0][0]).toMatchSnapshot();
});
