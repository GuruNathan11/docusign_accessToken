const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());


const port = 3000;
const controller = require('./controller');

app.use('/', controller);
app.get("/", (req,res) => res.send ("Welcome to code API"));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
