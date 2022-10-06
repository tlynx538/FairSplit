const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 8888;

app.use(express.json())
app.use(express.urlencoded({ extended:false }));
app.use(morgan('combined'));

//const routes = require('./routes/route');
//app.use('/api/',routes);
app.get('/', (req, res) => {
  res.json({"message": 'Splitkaro Group Expense Tracking API'});
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})