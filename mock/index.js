const express = require('express');
const app = express();
const port = process.env.PORT || 3013

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

//下面兩段解決 CORS * 全部路由意思
const cors = require('./utils/cors');
app.use('/*',cors)

const test = require("./router/test");
app.use('/api', test);

const ryder = require("./router/ryder");
app.use('/', ryder);


// 中間層 要執行第三個參數才能往下一頁
app.use((req, res, next) => {
  // console.log('Time:', Date.now());
  next();
});
  

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`mock server listening at http://localhost:${port}`))


