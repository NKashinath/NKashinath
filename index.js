const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./routers/user.router');
const productRouter = require('./routers/products.router');
const bodyparser = require('body-parser');


var cors = require('cors');

app.use(cors());

app.use(bodyparser.json());

app.use('/users', userRouter);

app.use('/products', productRouter);

app.listen(3500, ()=>{
    console.log('node is listening on port 3500')
})

mongoose.connect('mongodb+srv://knagaram:ADPadp@123@kashinath.fj5aj.mongodb.net/OShop?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true} ,(err, res)=>{
    if(res)
        console.log('Connected to OShop DB on Mongoose');
     
    else
        console.log(err)
    })

app.get('/', (req, res)=>{
    res.send('Hello Kashinath');
});