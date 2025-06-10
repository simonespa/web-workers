import express from 'express';
import rateLimit from 'express-rate-limit';

const app = express()
const port = 3000

// Set up rate limiter: maximum of 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

// Apply rate limiter to all requests
app.use(limiter);

app.get('/', (req, res) => {
  res.sendFile('index.html', { 'root': 'src' });
});

app.get('/styles.css', (req, res) => {
  res.sendFile('styles.css', { 'root': 'src' });
});

app.get('/main.js', (req, res) => {
  res.sendFile('main.js', { 'root': 'src' });
});

app.get('/fibonacci.js', (req, res) => {
  res.sendFile('fibonacci.js', { 'root': 'src' });
});

app.get('/fibonacci-worker.js', (req, res) => {
  res.sendFile('fibonacci-worker.js', { 'root': 'src' });
});

app.get('/fibonacci/:number', async (req, res) => {
  const fibonacci = (await import('./fibonacci.js')).default;

  const number = parseInt(req.params.number, 10);

  if (isNaN(number) || number < 0) {
    res.status(400).send({
      error: "Please enter a valid non-negative integer."
    });
  } else {
    res.send({
      result: fibonacci(number)
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log('Rate limiting enabled: max 100 requests per 15 minutes.');
});
