const express = require('express');
const cors = require('cors');
const publisher = require('./publisher');
const app = express();
const port = 3030;

app.use(express.json());

app.use(cors());

const subscribers = new Map();

app.post('/addSubscriber', function(req, res) {
  const pushSubscription = req.body;
  const id = pushSubscription.keys.auth;
  subscribers.set(id, pushSubscription);
  console.log(`New ng subscriber added. Total Subscribers: ${subscribers.size}`);
  publisher.notify(subscribers);
  res.send();
});

app.post('/removeSubscriber', function(req, res) {
  const id = req.body.id;
  subscribers.delete(id);
  console.log(`Ng subscriber unsubscribed. Total Subscribers: ${subscribers.size}`);
  res.send();
});

setInterval(() => publisher.notify(subscribers), 30000);

app.listen(port, () => console.log(`Server App is running at http://localhost:${port}`));
