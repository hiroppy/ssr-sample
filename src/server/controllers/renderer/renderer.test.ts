/**
 * @jest-environment node
 */

// https://github.com/styled-components/styled-components/issues/811

import { Response } from 'express';
import httpMocks, { MockResponse } from 'node-mocks-http';
import { get } from '.';

test.skip('should return the get of renderer response', async () => {
  const req = httpMocks.createRequest({
    url: '/apollo',
  });
  const res = httpMocks.createResponse();
  const data = (await get(req, res)) as MockResponse<Response>;

  console.log(data._getData());
});

test('should return 500 when occur internal errors', async () => {
  jest.resetModules();
  jest.mock('@loadable/server', () => {
    return {
      ChunkExtractor: () => {
        return new Error();
      },
    };
  });

  const { get } = await import('.');
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  const data = (await get(req, res)) as MockResponse<Response>;

  expect(data.statusCode).toEqual(500);
});
