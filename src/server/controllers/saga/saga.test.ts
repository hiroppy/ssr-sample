import httpMocks, { MockResponse } from 'node-mocks-http';
import { getAll, post } from '.';

test('should return the getAll of api response', () => {
  const req = httpMocks.createRequest({
    query: {
      maxLength: 1
    }
  });
  const res = httpMocks.createResponse();
  const data = getAll(req, res) as MockResponse<ReturnType<typeof getAll>>;

  expect(data._getJSONData()).toMatchSnapshot();
});

test('should return the post of api response', () => {
  const res = httpMocks.createResponse();

  {
    const req = httpMocks.createRequest({
      params: {
        id: 1
      }
    });
    const data = post(req, res) as MockResponse<ReturnType<typeof post>>;

    expect(data._getJSONData()).toMatchSnapshot();
  }

  {
    const req = httpMocks.createRequest({
      params: {
        id: 1000
      }
    });
    const data = post(req, res) as MockResponse<ReturnType<typeof post>>;

    expect(data._getJSONData()).toMatchSnapshot();
  }
});
