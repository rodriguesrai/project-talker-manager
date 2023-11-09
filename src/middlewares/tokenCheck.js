const authorization = (req, res, next) => {
  try {
    const { authorization: authorizationHeaders } = req.headers;
    if (!authorizationHeaders) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (authorizationHeaders.length !== 16) {
      return res.status(401).json({ message: 'Token inválido' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Erro ao conferir token' });
  }
  next();
};

module.exports = authorization;