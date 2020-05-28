self.addEventListener('notificationclose', event => {
  console.log('notification closed', event);
});

self.addEventListener('notificationclick', event => {
  console.log('notification clicked', event, event.action);
});
