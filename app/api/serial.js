// pages/api/random-data.js (or app/api/random-data/route.js for App Router)

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');

  let counter = 0;
  const intervalId = setInterval(() => {
    counter++;
    const data = {
      id: counter,
      param1: Math.random(),
      param2: `String ${Math.floor(Math.random() * 100)}`,
      param3: Math.random() > 0.5,
      param4: new Date().toISOString(),
      param5: {
        subParam1: Math.random() * 100,
        subParam2: `Nested Value ${Math.floor(Math.random() * 50)}`
      },
      param6: Array.from({ length: 3 }, () => Math.floor(Math.random() * 20)),
      param7: `Dynamic Info ${counter}`
    };

    res.write(JSON.stringify(data) + '\n'); // Write JSON data followed by a newline

    if (counter >= 20) { // Example: stop after 20 data points
      clearInterval(intervalId);
      res.end();
    }
  }, 1000); // Stream data every 1 second

  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
}