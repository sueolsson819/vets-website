const core = require('@actions/core');

try {
  // console.log(`::set-output name=app_entries::vaos`);
  core.setOutput('entry_names', 'check-in');
} catch (error) {
  core.setFailed(error.message);
}
