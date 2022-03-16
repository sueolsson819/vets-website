import environment from 'platform/utilities/environment';

export const mapboxParam = environment.isProduction()
  ? 'REACT_APP_VALocatorProd'
  : 'REACT_APP_VALocatorDev';

const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-gov-west-1',
});

const parameterStore = new AWS.SSM();

const tokenFail = err => {
  // eslint-disable-next-line no-console
  console.log(err);
  return () => process.env.MAPBOX_FALLBACK;
};

const tokenSuccess = data => {
  data.then(params => {
    if (params.length < 1 || params[0]?.Value) {
      return tokenFail('Param doesnt exist!!');
    }
    return () => params[0].Value;
  });
};

const getParam = param => {
  return new Promise((res, rej) => {
    parameterStore.getParameter({ Name: param }, (err, data) => {
      if (err) {
        return rej(err.message || err);
      }
      return res(data);
    });
  });
};

/*
  export const mapboxTokenPlatform = async () => {
    const awaited = await getParam(mapboxParam)
      .then(data => tokenSuccess(data))
      .catch(err => tokenFail(err));
    console.log(awaited);
    return awaited;
}; */

export const mapboxTokenPlatform = getParam(mapboxParam)
  .then(data => tokenSuccess(data))
  .catch(err => tokenFail(err));
