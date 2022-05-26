// eslint-disable-next-line no-console
console.log('Hello from service worker');

self.addEventListener('notificationclick', event => {
  // eslint-disable-next-line no-console
  console.log('Notification clicked, closing notification');
  event.notification.close();
});

// Register event listener for the 'push' event.
self.addEventListener('push', event => {
  // Keep the service worker alive until the notification is created.
  const notificationData = event.data.json();
  event.waitUntil(
    self.registration.showNotification(notificationData.title, {
      body: notificationData.body,
      icon: '/img/vic-va-seal.png',
    }),
  );
});
