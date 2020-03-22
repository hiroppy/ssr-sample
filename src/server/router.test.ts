/**
 * @jest-environment node
 */

// if you don't change the jest environment, styled-components won't run

import request from 'supertest';
import { runServer } from './server';

test('should return the favicon', async () => {
  const app = runServer();
  const res = await request(app).get('/favicon.ico');

  expect(res.status).toEqual(200);
});

test('should return the assets', async () => {
  const app = runServer();
  const res = await request(app).get('/public');

  expect(res.status).toEqual(301);
  expect(res.text.length).not.toEqual(0);
});

test('should return the api response of get::health', async () => {
  const app = runServer();
  const res = await request(app).get('/api/health');

  expect(res.status).toEqual(200);
  expect(res.text.length).not.toEqual(0);
});

test('should return the api response of get::saga', async () => {
  const app = runServer();
  const res = await request(app).get('/api/saga');

  expect(res.status).toEqual(200);
  expect(res.text.length).not.toEqual(0);
});

test('should return the api response of post::saga', async () => {
  const app = runServer();
  const res = await request(app).post('/api/saga/1').send({ id: 1 });

  expect(res.status).toEqual(200);
  expect(res.text.length).not.toEqual(0);
});

test('should return the api response of get::graphql', async () => {
  const app = runServer();
  const res = await request(app).get('/graphql');

  expect(res.status).toEqual(400);
});

test('should return HTML', async () => {
  const app = runServer();
  const res = await request(app).get('/');

  expect(res.status).toEqual(200);
  expect(res.text.length).not.toEqual(0);
});
