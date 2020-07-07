const webPush = require('web-push');
const vapidPublicKey = 'BEyvjYWb29Aww8_aSq5q2qvceZwnAvvGD6uDMlOfRJCMjhxM5zZFBGZslOkl7VfwQ6MDXAyVg8SdCpixyczbqxo';
const vapidPrivateKey = 'lyKT6808Tqcm9n5Uw2DjNbeKuDDMVbVlqznOEgKGsJ4';

const options = {
  TTL: 60,
  vapidDetails: {
    subject: 'mailto: example@example.com',
    publicKey: vapidPublicKey,
    privateKey: vapidPrivateKey
  }
};

const notificationPayload = {
  notification: {
    title: 'Hello from ng Server!'
  }
};

const notify = (subscribers) => {
  if (subscribers.size < 1) {
    console.log('No ng subscribers to notify');

    return;
  }

  subscribers.forEach((subscriber) => {
    webPush.sendNotification(
      subscriber,
      JSON.stringify(notificationPayload),
      options
    )
      .then(() => console.log(`${subscribers.size} ng subscribers notified.`))
      .catch(error => console.error('Error in pushing notification', error))
  })
};

module.exports = {notify};
