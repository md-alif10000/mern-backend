const Coupon=require('../../models/coupon')

exports.addCoupon=(req,res)=>{
    console.log(req.body)
    const {name,type,amount,validFrom,validTo}=req.body;
    const coupon=new Coupon({
        name,
        type,
        amount,
        validFrom,
        validTo
    })

    coupon.save().then((data,error) => {
			if (error) return res.status(400).json({ error });
			if (data) {
				return res.status(201).json({ data });
			}
		});
}