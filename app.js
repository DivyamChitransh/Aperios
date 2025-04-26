require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');

const cartroutes = require('./Routes/cartRoutes.js');
const itemRoutes = require('./Routes/ItemRoutes.js');
const promocoderoutes = require('./Routes/promocoderoutes.js');
const orderroutes = require('./Routes/orderroutes.js')
const userroutes = require('./Routes/userroutes.js')

const PORT = process.env.PORT;

const mongo_URI = process.env.MONGO_URI;
const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

app.use('/cart',cartroutes);
app.use('/Item',itemRoutes);
app.use('/promocode',promocoderoutes);
app.use('/orders',orderroutes);
app.use('/user',userroutes);

require('./cronjobs/orderCleanup.js')

mongoose.connect(mongo_URI).then(() => console.log('Database Connected!')).catch(err => console.log('Error in Connecting',err))

app.listen(PORT,() => {
    console.log(`Server Running at ${PORT}`)
});
