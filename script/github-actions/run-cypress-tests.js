const { runCommandSync } = require('../utils');

const tests = JSON.parse(process.env.TESTS);
const step = Number(process.env.STEP);
const numContainers = Number(process.env.NUM_CONTAINERS);
const port = Number(process.env.PORT);
const newPort = Number(process.env.PORT) + 1;
const divider = Math.ceil(tests.length / numContainers);
const appUrl = process.env.APP_URLS.split(',')[0];

const batch = tests
  .map(test => test.replace('/home/runner/work/vets-website/vets-website/', ''))
  .slice(step * divider, (step + 1) * divider)
  .join(',');

if (batch !== '') {
  const status = runCommandSync(
    `CYPRESS_EVERY_NTH_FRAME=1 yarn cy:run --browser chrome --headless --reporter cypress-multi-reporters --reporter-options "configFile=config/cypress-reporters.json" --port ${newPort} --config baseUrl=http://localhost:${port} --spec '${batch}' --env app_url=${appUrl}`,
  );
  process.exit(status);
} else {
  process.exit(0);
}
