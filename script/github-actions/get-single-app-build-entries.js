/* eslint-disable no-console */
const find = require('find');
const path = require('path');
const core = require('@actions/core');

const config = require('../../config/single-app-build.json');

const changedFiles = process.env.CHANGED_FILE_PATHS.split(' ');

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
  const fullPath = path.join(root, `./src/applications/${appDirectory}`);
  const manifestFile = find
    .fileSync(/manifest\.(json|js)$/, fullPath)
    // eslint-disable-next-line import/no-dynamic-require
    .map(file => require(file))[0];

  return manifestFile.entryName;
};

/**
 * If the provided file is part of an app, and that app is in the allow list,
 * returns the app entry name. Otherwise returns null
 *
 * @param {string} file
 * @param {string[]} allowList
 * @returns {string|null}
 */
const getAllowedEntryName = (file, allowList) => {
  if (file.startsWith('src/applications')) {
    const entryName = getEntryName(file);
    if (allowList.includes(entryName)) {
      return entryName;
    }
  }

  return null;
};

/**
 * Given a list of files and an app allow list, checks if a single app build
 * is possible. If so, returns a comma-separated list of app entry names.
 * If not, returns an empty string
 *
 * @param {string[]} files
 * @param {string[]} allowList
 * @returns {string}
 */
const makeEntryString = (files, allowList) => {
  const allowedEntries = [];
  for (const file of files) {
    const entryName = getAllowedEntryName(file, allowList);
    if (entryName) {
      allowedEntries.push(entryName);
    } else {
      return ''; // A full build is required, no need to continue
    }
  }

  return [...new Set(allowedEntries)].join(',');
};

core.exportVariable('ENTRY_NAMES', makeEntryString(changedFiles, config.allow));
