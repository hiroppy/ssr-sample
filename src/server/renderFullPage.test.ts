import { renderFullPage } from './renderFullPage';

test('should create safe html', () => {
  const meta = '<meta>meta</meta>';
  const style = '<style>style</style>';
  const assets = '<script>script</script>';
  const body = '<body>body</body>';
  const preloadedState = JSON.stringify({
    arr: ['foo', 'bar'],
    obj: {
      foo: 1,
      bar: 1
    },
    str: 'テスト'
  });
  const scripts = '<script>window</script>';

  expect(renderFullPage({ meta, style, assets, body, preloadedState, scripts })).toMatchSnapshot();
});
