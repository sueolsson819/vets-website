// eslint-disable-next-line no-console
console.log('Hello from service worker');

self.addEventListener('notificationclick', event => {
  // eslint-disable-next-line no-console
  console.log('Notification clicked, closing notification');
  event.notification.close();
});
