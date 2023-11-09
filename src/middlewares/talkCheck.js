const checkTalkExistence = (req, res) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  return true;
};

const checkWatchedAt = (req, res) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!dateRegex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  return true;
};

const checkRateExistent = (req, res) => {
  const { talk } = req.body;
  const { rate } = talk;
  if (rate === undefined || rate === null) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  return true;
};
const checkRate = (req, res) => {
  const { talk } = req.body;
  const { rate } = talk;
  if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  return true;
};  

const talkCheck = (req, res, next) => {
  const checks = [checkTalkExistence, checkRateExistent, checkWatchedAt, checkRate];
  const results = checks.map((check) => check(req, res));

  if (results.every((result) => result === true)) {
    next();
  }
};

module.exports = talkCheck;
