const express = require('express');

const app = express();
app.use(express.json());
const readFileTalker = require('./fsReadFile');

const HTTP_OK_STATUS = 200;

const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  try {
    const data = await readFileTalker();
    console.log(data);
    return res.status(HTTP_OK_STATUS).json(data);
  } catch (error) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
});

app.get('/talker/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = readFileTalker();
    const talkers = JSON.parse(data);
    const talker = talkers.find((talker) => talker.id === Number(id));
    console.log(talker);
    return res.status(HTTP_OK_STATUS).json(talker);
  } catch (error) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});