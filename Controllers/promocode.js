const PromoCode = require('../models/promocodemodel.js');

const addPromocode = async(req,res) => {
    try{
        const {promocode,type,value,expiresAt,usageLimit} = req.body;
        const newPromocode = new PromoCode({promocode,type,value,expiresAt,usageLimit});
        await newPromocode.save();
        res.status(201).json({message:'New Promocode Created!',newPromocode})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
};

const getPromocode = async(req,res) => {
    try{
        const getallpromocodes = await PromoCode.find();
        res.status(200).json({message:'All Promocodes!',getallpromocodes});
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}


module.exports = {addPromocode,getPromocode};