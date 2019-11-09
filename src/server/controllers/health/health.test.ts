import httpMocks, { MockResponse } from 'node-mocks-http';
import { get } from '.';

test('should return the get of api response', () => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  const data = get(req, res) as MockResponse<ReturnType<typeof get>>;

  expect(data._getJSONData()).toMatchSnapshot();
});
