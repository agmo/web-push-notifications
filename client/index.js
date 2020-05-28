const client = (() => {
  let serviceWorkerRegObj;
  const notificationButton = document.getElementById('btn-notify');

  const showNotificationButton = () => {
    notificationButton.style.display = 'inline-block';
    notificationButton.addEventListener('click', showNotification);
  };

  const showNotification = () => {
    navigator.serviceWorker.getRegistration()
      .then(registration => registration.showNotification('My First Notification'));
  };

  const checkNotificationSupport = () => {
    if(!('Notification' in window)) {
      return Promise.reject('The browser doesn\'t support notifications.')
    }

    console.log("The browser supports notifications!")
    return Promise.resolve();
  };

  const registerServiceWorker = () => {
    if(!('serviceWorker') in navigator) {
      return Promise.reject('ServiceWorker support is not available.');
    }

    return navigator.serviceWorker.register('service-worker.js')
      .then(regObj => {
        console.log('Service worker is registered successfully!');
        serviceWorkerRegObj = regObj;
        showNotificationButton();
      });
  };

  const requestNotificationPermissions = () => {
    return Notification.requestPermission(status => {
      console.log('Notification Permission Status:', status);
    });
  };

  checkNotificationSupport()
    .then(registerServiceWorker)
    .then(requestNotificationPermissions)
    .catch(err => console.error(err))
})();
