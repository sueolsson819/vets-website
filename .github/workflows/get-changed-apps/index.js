const core = require('@actions/core');

try {
  console.log(`::set-output name=app_entries::vaos`);
  core.setOutput('app_entries', 'check-in');
} catch (error) {
  core.setFailed(error.message);
}
