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
    send: jest.fn(),
    status: {
      send: () => {}
    }
  };

  get(req, res);

  expect(res.send).toHaveBeenCalled();
});
