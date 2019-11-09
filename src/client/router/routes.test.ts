import {
  LoadableTopPage,
  LoadableSagaPage,
  LoadableApolloPage,
  LoadableNotFoundPage
} from './routes';

test('should resolve required modules', async () => {
  expect(
    (((await LoadableTopPage.load()) as unknown) as { default: Function }).default.name
  ).toEqual('Top');

  expect(
    (((await LoadableSagaPage.load()) as unknown) as { default: Function }).default.name
  ).toEqual('Saga');

  expect(
    (((await LoadableApolloPage.load()) as unknown) as { default: Function }).default.name
  ).toEqual('Apollo');

  expect(
    (((await LoadableNotFoundPage.load()) as unknown) as { default: Function }).default.name
  ).toEqual('NotFound');
});
