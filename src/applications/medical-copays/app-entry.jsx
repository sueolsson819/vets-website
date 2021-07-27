import 'platform/polyfills';
import './sass/medical-copays.scss';

import startApp from 'platform/startup/router';
import Routes from './routes';
import reducer from './reducers';
import manifest from './manifest.json';

startApp({
  url: manifest.rootUrl,
  reducer,
  routes: Routes(),
});
