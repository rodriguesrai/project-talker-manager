const express = require('express');

const app = express();
app.use(express.json());
const readFileTalker = require('./utils/fsReadFile');
const writeFileTalker = require('./utils/fsWriteFile');
const generateToken = require('./utils/tokenGenerator');
const authenticate = require('./middlewares/authenticate');

const nameCheck = require('./middlewares/nameCheck');
const tokenCheck = require('./middlewares/tokenCheck');
const ageCheck = require('./middlewares/ageCheck');
const talkCheck = require('./middlewares/talkCheck');

const HTTP_OK_STATUS = 200;

const PORT = process.env.PORT || '3001';

app.listen(PORT, () => {
  console.log('Online');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  try {
    const talkers = await readFileTalker();
    return res.status(HTTP_OK_STATUS).json(talkers);
  } catch (error) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
});

app.get('/talker/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const talkers = await readFileTalker();
    const talkerId = talkers.find((talker) => talker.id === Number(id));
    if (talkerId) {
      return res.status(HTTP_OK_STATUS).json(talkerId);
    } 
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno' });
  }
});

app.post('/login', authenticate, (req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});

app.post('/talker', 
  tokenCheck, 
  nameCheck,
  ageCheck,
  talkCheck, async (req, res) => {
    try {
      const { name, age, talk } = req.body;
      const talkers = await readFileTalker();
      const newTalker = {
        id: talkers.length + 1,
        name,
        age,
        talk,
      };
      talkers.push(newTalker);
      await writeFileTalker(talkers);
      return res.status(201).json(newTalker);
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno' });
    }
  });