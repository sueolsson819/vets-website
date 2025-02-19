import 'platform/polyfills';
// import '../sass/edu-benefits.scss';
import './sass/1990e.scss';

import startApp from 'platform/startup';

import routes from './routes';
import reducer from './reducer';
import manifest from './manifest.json';

startApp({
  url: manifest.rootUrl,
  reducer,
  routes,
  entryName: manifest.entryName,
});
