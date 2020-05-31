const express = require('express');
const app = express();

// Serve static files from specified directory
app.use(express.static(__dirname));

const clientAppServer = app.listen(8000, () => {
  const host = clientAppServer.address().address
  const port = clientAppServer.address().port

  console.log(`App is running at ${host}:${port}`)
});
