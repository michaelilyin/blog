import {FakeBackendProvider} from '../app/dev/graphql.fake-backend';

export const environment = {
  production: false,
  defaultLang: 'en',
  providers: [
    FakeBackendProvider
  ]
};
