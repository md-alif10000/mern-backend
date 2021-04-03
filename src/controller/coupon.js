
const Coupon=require('../models/coupon')

exports.validateCoupon=(req,res)=>{
    const {name}=req.body
    Coupon.findOne({ name }, (error,coupon) => {
			if (error) return res.status(400).json({ error });
			if (!coupon)
				return res.status(404).json({ message: "Coupon not found " });
			if (coupon) {
				return res.status(200).json({
					coupon,
				});
			}
		});
}
