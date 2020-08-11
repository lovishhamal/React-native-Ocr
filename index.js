const express = require('express');
const app = express();
const PORT = 5000;
const { createWorker } = require('tesseract.js');

app.use(express.json());

app.post('/analyze', async (req, res) => {
  const path = req.body.file.uri.replace('file://', '');
  const worker = createWorker({
    logger: (m) => console.log(m),
  });
  (async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const {
      data: { text },
    } = await worker.recognize(path);
    console.log(text);
    res.json(text);
    await worker.terminate();
  })();
});

app.listen(PORT, () => {
  console.log(`Server stared`);
});
