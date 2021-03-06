const client = (() => {
  let serviceWorkerRegObj;
  const notificationButton = document.getElementById('btn-notify');
  const pushButton = document.getElementById('btn-push');
  const notificationContainer = document.getElementById('push-notification');
  let isUserSubscribed = false;

  const notifyInApp = (message) => {
    notificationContainer.innerText = message;
  };

  const showNotificationButton = () => {
    notificationButton.style.display = 'inline-block';
    notificationButton.addEventListener('click', showNotification);
  };

  const showPushButton = () => {
    pushButton.style.display = 'inline-block';
  };

  let counter = 0;
  const showNotification = () => {
    const options = {
      body: 'This is an important body!',
      tag: "group1",
      actions: [
        {action: 'search', title: 'Try Searching!'},
        {action: 'close', title: 'Forget it!'},
      ],
      data: {
        githubUser: 'agmo'
      }
    };

    navigator.serviceWorker.getRegistration()
      .then(registration => registration.showNotification(`Notification #${counter++}`, options));
  };

  const checkNotificationSupport = () => {
    if (!('Notification' in window)) {
      return Promise.reject('The browser doesn\'t support notifications.');
    }

    console.log('The browser supports notifications!')
    return Promise.resolve();
  };

  const registerServiceWorker = () => {
    if (!('serviceWorker') in navigator) {
      return Promise.reject('ServiceWorker support is not available.');
    }

    return navigator.serviceWorker.register('service-worker.js')
      .then(regObj => {
        console.log('Service worker is registered successfully!');
        serviceWorkerRegObj = regObj;

        if (!serviceWorkerRegObj.pushManager) {
          alert('Sorry, this browser is not supported.');

          return;
        }

        showNotificationButton();
        showPushButton();

        serviceWorkerRegObj.pushManager.getSubscription()
          .then(subscription => {
            if (subscription) {
              disablePushNotificationButton();
            } else {
              enablePushNotificationButton();
            }
          });

        navigator.serviceWorker.addEventListener('message', event => notifyInApp(event.data))
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
    .catch(err => console.error(err));

  const disablePushNotificationButton = () => {
    isUserSubscribed = true;
    pushButton.innerText = 'DISABLE PUSH NOTIFICATIONS';
  };

  const enablePushNotificationButton = () => {
    isUserSubscribed = false;
    pushButton.innerText = 'ENABLE PUSH NOTIFICATIONS';
  };

  const setupPush = () => {
    function urlB64ToUint8Array(url) {
      const padding = '='.repeat((4 - url.length % 4) % 4);
      const base64 = (url + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }

      return outputArray;
    }

    const subscribeWithServer = (subscription) => {
      return fetch('http://localhost:3000/addSubscriber', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    };

    const subscribeUser = () => {
      const appServerPublicKey = 'BEyvjYWb29Aww8_aSq5q2qvceZwnAvvGD6uDMlOfRJCMjhxM5zZFBGZslOkl7VfwQ6MDXAyVg8SdCpixyczbqxo';
      const publicKeyAsArray = urlB64ToUint8Array(appServerPublicKey);

      serviceWorkerRegObj.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKeyAsArray
      })
        .then(subscription => {
          console.log(JSON.stringify(subscription, null, 4));
          subscribeWithServer(subscription);
          disablePushNotificationButton();
        })
        .catch(error => console.error('Failed to subscribe to Push Service.', error));
    };

    const unsubscribeWithServer = (id) => {
      return fetch('http://localhost:3000/removeSubscriber', {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    };

    const unSubscribeUser = () => {
      console.log('unsubscribing user');

      serviceWorkerRegObj.pushManager.getSubscription()
        .then(subscription => {
          if (subscription) {
            let subAsString = JSON.stringify(subscription);
            let subAsObject = JSON.parse(subAsString);
            unsubscribeWithServer(subAsObject.keys.auth);

            return subscription.unsubscribe();
          }
        })
        .then(enablePushNotificationButton)
        .catch(error => console.error('Failed to unsubscribe from Push Service.', error));
    }

    pushButton.addEventListener('click', () => {
      if (isUserSubscribed) {
        unSubscribeUser();
      } else {
        subscribeUser();
      }
    })
  };

  setupPush();
})();
