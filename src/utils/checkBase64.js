const fs = require('fs');
const path = require('path');

const checkBase64 = (item) => {
  const matches = item.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    return 'failed';
  }
  const imgName = `${Date.now()}.${matches[1].split('/')[1]}`;
  const filePath = `../public/avatars/${imgName}`;

  const buffer = Buffer.from(matches[2], 'base64');
  fs.writeFileSync(path.join(__dirname, filePath), buffer);

  //   return filePath;
  return imgName;
};

module.exports = checkBase64;
