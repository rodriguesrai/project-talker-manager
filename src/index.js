const express = require('express');

const app = express();
app.use(express.json());
const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;

const PORT = process.env.PORT || '3001';
const talkerPath = 'src/talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  try {
    const data = await fs.readFile(talkerPath, 'utf-8');
    const talkers = JSON.parse(data);
    console.log(talkers);
    
    return res.status(HTTP_OK_STATUS).json(talkers);
  } catch (error) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});