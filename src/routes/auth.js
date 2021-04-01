const router = require("express").Router();


const {
	userRegister,
	userLogin,
	requireLogin,
	userRegisterOtp,
	passUpdateOtp,
	changePassword,
} = require("../controller/auth");
const { validateRegisterRequest, isRegisterRequestValidated,
  validateLoginRequest,
  isLoginRequestValidated
} = require("../validators/auth");





router.post("/login",
  validateLoginRequest,
  isLoginRequestValidated,
  userLogin);

router.post('/register_verify',userRegisterOtp)
router.post('/pass_update_otp',passUpdateOtp)
router.post("/change_password", changePassword);



router.post(
  "/register",
  validateRegisterRequest,
  isRegisterRequestValidated,
  userRegister
);



 

module.exports = router;
