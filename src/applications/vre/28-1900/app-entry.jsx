import 'platform/polyfills';
import './sass/28-1900-chapter-31.scss';

import startApp from 'platform/startup';

import { initI18n } from './i18n';

import routes from './routes';
import reducer from './reducers';
import manifest from './manifest.json';

initI18n();

startApp({
  url: manifest.rootUrl,
  reducer,
  routes,
});
