const express = require('express');


const app = express();
const redis = require('redis');

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost'

const client = redis.createClient({ url: REDIS_URL });
(async () => {
  await client.connect();
})()

const counter = {};

app.get('/counter/:bookId', (req, res) => {
  const { bookId } = req.params;
  res.json(counter[bookId] ? counter[bookId] : 0);
});

app.post('/counter/:bookId/incr', async (req, res) => {
  const { bookId } = req.params;
  // counter[bookId] ? counter[bookId] += 1 : counter[bookId] = 1;
  try {
    // const cnt = await client.incr(bookId);
    const cnt = await client.set(`${bookId}`,``)
    res.json(`Счетчик ${bookId} увеличен на 1, значение ${cnt}`);
  } catch (e) {
    res.json("Err")
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);