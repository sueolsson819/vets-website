import 'platform/polyfills';
import './sass/coe-status.scss';

import startApp from 'platform/startup/router';

import routes from './routes';
import reducer from '../shared/reducers';
import manifest from './manifest.json';

startApp({
  url: manifest.rootUrl,
  reducer,
  routes,
});
