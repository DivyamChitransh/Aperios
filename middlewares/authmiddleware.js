require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = process.env.SECRET_KEY;

const authentication = async(req,res,next) => {
    const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

    try{
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch(error){
        res.status(404).json({message:'Invaid Token'})
    }
};

module.exports = {authentication};