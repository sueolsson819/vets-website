/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 4000;

const dummyDb = { subscription: null };
const saveToDatabase = async subscription => {
  dummyDb.subscription = subscription;
};

if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.log(
    'You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY ' +
      'environment variables. You can use the following ones:',
  );
  console.log(webpush.generateVAPIDKeys());
  return;
}

// Set the keys used for encrypting the push messages.
webpush.setVapidDetails(
  'https://serviceworke.rs/',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY,
);

// Setup Endpoints
app.get('/trigger', (req, res) => {
  const subscription = dummyDb.subscription.subscription;
  console.log('Sending Notification from server');
  const notification = {
    title: 'Schedule your booster',
    body: 'You may now receive booster shots at your VAMC',
  };
  webpush
    .sendNotification(subscription, JSON.stringify(notification))
    .then(function() {
      res.sendStatus(201);
    });
});

app.get('/vapidPublicKey', function(req, res) {
  res.send(process.env.VAPID_PUBLIC_KEY);
});

app.post('/register', async function(req, res) {
  const subscription = req.body;
  console.log('REGISTERING', subscription);
  await saveToDatabase(subscription);
  res.json({ message: 'success' });
});

app.listen(port, () => console.log(`Push server listening on port ${port}!`));
