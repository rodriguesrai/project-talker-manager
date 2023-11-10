const { Router } = require('express');

const talkerRouter = Router();
const HTTP_OK_STATUS = 200;

const readFileTalker = require('../utils/fsReadFile');
const writeFileTalker = require('../utils/fsWriteFile');

const { nameExistenceCheck, nameLengthcheck } = require('../middlewares/nameCheck');
const tokenCheck = require('../middlewares/tokenCheck');
const ageCheck = require('../middlewares/ageCheck');
const talkCheck = require('../middlewares/talkCheck');
const authorization = require('../middlewares/tokenCheck');
const talkerIdCheck = require('../middlewares/talkerIdCheck');

talkerRouter.get('/', async (req, res) => {
  try {
    const talkers = await readFileTalker();
    return res.status(HTTP_OK_STATUS).json(talkers);
  } catch (error) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
});

talkerRouter.get('/search', authorization, async (req, res) => {
  try {
    const { q } = req.query;
    const talkers = await readFileTalker();
    const talkersSearch = talkers.filter((talker) => talker.name.includes(q));
    return res.status(HTTP_OK_STATUS).json(talkersSearch);
  } catch (error) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
});

talkerRouter.get('/:id', async (req, res) => {
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

talkerRouter.post('/', 
  tokenCheck, 
  nameExistenceCheck,
  nameLengthcheck,
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

talkerRouter.put('/:id',
  authorization,
  talkerIdCheck,
  nameExistenceCheck,
  nameLengthcheck,
  ageCheck,
  talkCheck, async (req, res) => {
    try {
      const { id } = req.params;
      const { name, age, talk } = req.body;
      const talkers = await readFileTalker();
      const { talkerIndex } = req;
      const newTalker = {
        id: Number(id),
        name,
        age,
        talk,
      };
      talkers[talkerIndex] = newTalker;
      await writeFileTalker(talkers);
      return res.status(200).json(newTalker);
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno' });
    }
  });

talkerRouter.delete('/:id', authorization, talkerIdCheck, async (req, res) => {
  try {
    const talkers = await readFileTalker();
    const { talkerIndex } = req;
  
    talkers.splice(talkerIndex, 1);
    await writeFileTalker(talkers);
    return res.status(204).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno' });
  }
});


module.exports = talkerRouter;