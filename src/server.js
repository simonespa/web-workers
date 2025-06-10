import express from 'express';

const app = express()
const port = 3000

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
  console.log(`Example app listening on port ${port}`)
});
