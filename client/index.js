const client = (() => {
  let serviceWorkerRegObj;

  const checkNotificationSupport = () => {
    if(!('Notification' in window)) {
      return Promise.reject('The browser doesn\'t support notifications.')
    }

    console.log("The browser supports notifications!")
    return Promise.resolve();
  }

  const registerServiceWorker = () => {
    if(!('serviceWorker') in navigator) {
      return Promise.reject('ServiceWorker support is not available.');
    }

    return navigator.serviceWorker.register('service-worker.js')
      .then(regObj => {
        console.log('Service worker is registered successfully!');
        serviceWorkerRegObj = regObj;
      });
  }

  checkNotificationSupport()
    .then(registerServiceWorker)
    .catch(err => console.error(err))
})();
