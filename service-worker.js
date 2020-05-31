self.addEventListener('notificationclose', event => {
  console.log('notification closed', event);
});

self.addEventListener('notificationclick', event => {
  console.log('notification clicked', event, event.action);

  if (event.action === 'search') {
    const githubUser = event.notification.data.githubUser;
    clients.openWindow(`https://github.com/${githubUser}`);
  } else if (event.action === 'close') {
    console.log('notification closed');
  }
});

self.addEventListener('push', event => {
  const data = event.data.text();
  const options = {
    body: data
  };

  event.waitUntil(
    self.registration.showNotification('Server Push', options)
  );
});
