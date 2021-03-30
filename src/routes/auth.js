const router = require("express").Router();

const {userRegister, userLogin, requireLogin}=require("../controller/auth");
const { validateRegisterRequest, isRegisterRequestValidated,
  validateLoginRequest,
  isLoginRequestValidated
} = require("../validators/auth");





router.post("/login",
  validateLoginRequest,
  isLoginRequestValidated,
  userLogin);


router.post(
  "/register",
  validateRegisterRequest,
  isRegisterRequestValidated,
  userRegister
);



 

module.exports = router;
