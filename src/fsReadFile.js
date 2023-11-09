const fs = require('fs').promises;

const readFileTalker = async () => {
  try {
    const data = await fs.readFile('src/talker.json', 'utf-8');
    const talkers = JSON.parse(data);
    return talkers;
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = readFileTalker;