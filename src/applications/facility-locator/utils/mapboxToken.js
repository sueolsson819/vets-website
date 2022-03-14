import environment from 'platform/utilities/environment';

export const mapboxToken = environment.isProduction()
  ? process.env.REACT_APP_VALocatorProd
  : process.env.REACT_APP_VALocatorDev;
