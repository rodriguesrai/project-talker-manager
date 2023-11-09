const fs = require('fs').promises;

const WriteFileTalker = async (data) => {
  try {
    await fs.writeFile('src/talker.json', JSON.stringify(data), 'utf-8');
    console.log('Arquivo atualizado com sucesso!');
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = WriteFileTalker;