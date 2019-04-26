import { generateNonceId, csp } from './csp';

test('should return random variable', () => {
  const req: any = jest.fn();
  const res: any = {
    locals: {
      nonce: null
    }
  };
  const next: any = jest.fn();

  generateNonceId(req, res, next);

  expect(next.mock.calls.length).toEqual(1);
  expect(typeof res.locals.nonce).toEqual('string');
});
