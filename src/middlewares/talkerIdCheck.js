const readFileTalker = require('../utils/fsReadFile');

const talkerExistenceCheck = async (req, res, next) => {
  try {
    const { id } = req.params;
    const talkers = await readFileTalker();
    const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));

    if (talkerIndex === -1) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    req.talkerIndex = talkerIndex;

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno' });
  }
};

module.exports = talkerExistenceCheck;
