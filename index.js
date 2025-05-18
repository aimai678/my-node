const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Expressでサーバーが動いています！');
});

app.get('/about', (req, res) => {
  res.send('これはAboutページです。Node.jsで追加した別のルートです！');
});

app.post('/submit', (req, res) => {
  const receivedData = req.body;
  console.log('受け取ったデータ:', receivedData);

  // ここでファイルに保存
  fs.writeFile('data.json', JSON.stringify(receivedData, null, 2), (err) => {
    if (err) {
      console.error('ファイル書き込みエラー:', err);
      return res.status(500).json({ message: '保存に失敗しました' });
    }
    res.json({
      message: 'POSTデータを保存しました！',
      receivedData,
    });
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port} でサーバーが起動中`);
});

