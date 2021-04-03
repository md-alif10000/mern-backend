const express = require("express");
const { requireLogin, isAdmin, isUser } = require("../common-middleware");
const { addCoupon } = require("../controller/admin/coupon");
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

module.exports = router;
