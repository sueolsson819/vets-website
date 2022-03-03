import './sass/view-dependents.scss';
import 'platform/polyfills';

import startApp from 'platform/startup';

import dependencyVerificationReducer from '../../static-pages/dependency-verification/reducers';

import routes from './routes';
import reducer from './reducers';
import manifest from './manifest.json';

startApp({
  url: manifest.rootUrl,
  reducer: { ...reducer, ...dependencyVerificationReducer },
  routes,
  entryName: manifest.entryName,
});
