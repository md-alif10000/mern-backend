const GiftCard=require('../models/giftCard')


exports.getGiftCards=(req,res)=>{
    GiftCard.find({}).exec((cards,error)=>{
        if(error)return res.status(400).json(error)
        if(cards) return res.status(200).json({cards})
    })
}