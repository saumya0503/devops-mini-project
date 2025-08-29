const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('🚀 DevOps Pipeline Running Successfully!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
