const core = require('@actions/core');

const { getAppManifests } = require('../../script/manifest-helpers');

function exportAppList() {
  const applicationList = getAppManifests().map(app => {
    return {
      name: app.appName,
      slug: app.entryName,
    };
  });
  core.exportVariable('APPLICATION_LIST', applicationList);
}

exportAppList();
