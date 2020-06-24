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

const notify = (subscribers) => {
  if (subscribers.size < 1) {
    console.log('No subscribers to notify');

    return;
  }

  subscribers.forEach((subscriber) => {
    webPush.sendNotification(
      subscriber,
      'Hello from Server!',
      options
    )
      .then(() => console.log(`${subscribers.size} subscribers notified.`))
      .catch(error => console.error('Error in pushing notification', error))
  })
};

module.exports = {notify};
