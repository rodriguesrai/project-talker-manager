const checkTalkExistence = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

const checkWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!dateRegex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const checkRateExistentBody = (req, res, next) => {
  const { talk } = req.body;
  if (talk.rate === undefined || talk.rate === null) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  next();
};

const checkRateBody = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};  

const checkRateQueryExistent = (req, res, next) => {
  const { rate } = req.query;

  if (rate !== undefined) {
    const ratePattern = /^[1-5]$/;

    if (!ratePattern.test(rate)) {
      return res.status(400).json({
        message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
      });
    }

    return next();
  }

  next();
};

module.exports = {
  checkTalkExistence,
  checkWatchedAt,
  checkRateExistentBody,
  checkRateBody,
  checkRateQueryExistent,
};
