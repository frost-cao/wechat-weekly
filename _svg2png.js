const sharp = require('sharp');
const path = require('path');
const dir = 'C:/Users/v_yiicao/WorkBuddy/20260413140616/wechat-weekly';
sharp(path.join(dir, 'og-cover.svg'))
  .resize(1200, 630)
  .png({ compressionLevel: 9, palette: true })
  .toFile(path.join(dir, 'og-cover.png'))
  .then(info => console.log('PNG 生成成功:', info.format, info.width + 'x' + info.height, (info.size/1024).toFixed(1) + 'KB'))
  .catch(err => { console.error('转换失败:', err.message); process.exit(1); });
