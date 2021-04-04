const express = require("express");
const { requireLogin, isAdmin, isUser } = require("../common-middleware");
const {
	addCoupon,
	getAllCoupon,
	updateCoupon,
	deleteCoupon
} = require("../controller/admin/coupon");
const { validateCoupon } = require("../controller/coupon");
const router = express.Router();

router.post(
	"/coupon/addCoupon",
	requireLogin,
	isAdmin,
	addCoupon
);

router.post(
	"/coupon/validateCoupon",
	requireLogin,
	isUser,
	validateCoupon
);

router.get("/coupon/allCoupon", getAllCoupon);
router.put('/coupon/updateCoupon',updateCoupon)
router.delete("/coupon/deleteCoupon", deleteCoupon);

module.exports = router;
