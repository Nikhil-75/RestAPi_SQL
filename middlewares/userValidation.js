const joi = require('joi')

const userData = require('../models/userModel')

const userValidation = async (req,res, next) => {
    const registerSchema = joi.object({
        username: joi.string().min(6).max(15).required(),
        firstName: joi.string().min(5).max(15).required(),
        lastName: joi.string().min(5).max(15).required(),
        email: joi.string().email().required(),
        password: joi.string()
          .pattern(new RegExp("^[a-zA-z0-9]{3,30}$"))
          .required(),
        confirm_password: joi.ref("password"),
    });

    const { error } = registerSchema.validate(req.body);
    if (error) {
        return next(error);
    }
 

    try {
        const emailExist = await userData.findOne({ where : { email: req.body.email} });
        if (emailExist) res.status(200).json({message: "This mail is already used"})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
       
      
      try {
        const usernameExist =  await userData.findOne({ where : { username: req.body.username}})
        if( usernameExist ) res.status(200).json({messagge: " Tis user already exist"})
      } catch (error) {
        
        res.status(400).json({ message: error.message });
      }
}
module.exports  = {userValidation}

