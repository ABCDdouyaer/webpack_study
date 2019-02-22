const express = require('express');

const app = express();

app.get('/api/user', (req, res) => {
  res.json({'name': 'wangwei'})
})
app.listen(8090);