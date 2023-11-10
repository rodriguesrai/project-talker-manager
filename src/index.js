const express = require('express');
const talkerRouter = require('./routes/talkers');

const app = express();
app.use(express.json());

const generateToken = require('./utils/tokenGenerator');
const authenticate = require('./middlewares/authenticate');

const HTTP_OK_STATUS = 200;

const PORT = process.env.PORT || '3001';

app.listen(PORT, () => {
  console.log('Online');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.post('/login', authenticate, (req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});

app.use('/talker', talkerRouter);