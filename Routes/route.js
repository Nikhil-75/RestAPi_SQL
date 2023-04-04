const  express = require("express");
const userCon = require('../controller/useController')
const  {userValidation, accessValidation} = require('../middlewares/userValidation')


const router = express.Router();

router.post("/registers", userValidation, userCon.userRegister);

router.post("/login", userCon.Login );

router.get("/get-user",  userCon.getUser)

router.put('/delete', userCon.userDelete)

router.get("/pagelist", userCon.getAllUser)

module.exports = router;