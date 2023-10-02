//dentro de este archivo van a estar los autenticadores
const express = require("express")
const router = express.Router()
const {validatorRegister, validatorLogin} = require("../validators/auth");
const { loginCtrl, registerCtrl } = require("../controllers/auth");


router.post("/register", validatorRegister, registerCtrl);

router.get("/login", validatorLogin, loginCtrl);

module.exports = router;