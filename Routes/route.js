const  express = require("express");
const userCon = require('../controller/useController')
const  {userValidation} = require('../middlewares/userValidation')

const router = express.Router();

router.post("/register", userValidation, userCon.userRegister);



module.exports = router;