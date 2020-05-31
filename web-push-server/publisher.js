const webPush = require('web-push');

const pushSubscription = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/cNqmXAkC764:APA91bGP9an3tT-TrVd_chmVXwnk8lb1yDPU7vh3887Z87UaB3msxWtVAMjQHi19OcvPogd1Q8KpZBH-ixCcwVHo11bF0dbKKePiWjS74uMFDHE5YKm3grV6fLD7qH7Rrp3D9WZ4cF6l",
  "expirationTime": null,
  "keys": {
    "p256dh": "BFadYef1Jp3EaJHwSYZhg3JuJc-MZFOuSUyCJ6CYxIm1MZmnHblqDNwJ2ZrGb_ul5unBCV65SnTrxzM-r5iyflw",
    "auth": "twfKio_naRC7RBGjN0qJfA"
  }
}; // The object that client app sends to the server. For now, copied from the browser console.

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

const notify = () => {
  webPush.sendNotification(
    pushSubscription,
    'Hello from Server!',
    options
  )
    .then(() => console.log(`Subscribers notified.`))
    .catch(error => console.error('Error in pushing notification', error))
};

notify();
