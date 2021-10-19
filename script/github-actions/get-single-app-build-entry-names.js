/* eslint-disable no-console */
const find = require('find');
const path = require('path');
const core = require('@actions/core');

/**
 * Takes a relative path and returns the entryName of
 * the app that the given path belongs to
 *
 * @param {string} filePath
 * @returns {string}
 */
const getEntryName = filePath => {
  const root = path.join(__dirname, '../..');
  const appDirectory = filePath.split('/')[2];
  const manifestFile = find
    .fileSync(
      /manifest\.(json|js)$/,
      path.join(root, `./src/applications/${appDirectory}`),
    )
    // eslint-disable-next-line import/no-dynamic-require
    .map(file => require(file))[0];

  return manifestFile.entryName;
};

const changedFiles = process.env.CHANGED_FILE_PATHS.split(' ').filter(file =>
  file.startsWith('src/applications'),
);
let isFullBuild = false;
const entryNames = [];

changedFiles.forEach(file => {
  if (file.startsWith('src/applications')) {
    entryNames.push(getEntryName(file));
  } else {
    isFullBuild = true; // All non-app changes require a full build
  }
});

// Create a string suitable for the --entry arg, with no duplicates
const entryString = [...new Set(entryNames)].join(',');
core.exportVariable('APP_ENTRY_NAMES', isFullBuild ? '' : entryString);
