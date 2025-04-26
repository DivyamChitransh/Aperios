const Item = require('../models/itemmodels.js');

const newItem = async(req,res) => {
    try{
        const {name,price} = req.body;
        const newItems = new Item({name,price});
        await newItems.save();
        res.status(200).json({message:'New Item added!',newItems})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
};

const getitems = async(req,res) => {
    try{
        const allItems = await Item.find();
        if(!allItems){
            return res.status(404).json({message:'No Items Present!'});
        }
        res.status(200).json({message:'All Items',allItems})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
};

module.exports = {newItem,getitems}