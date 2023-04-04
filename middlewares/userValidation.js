const joi = require('joi')

const userData = require('../models/userModel')

const userValidation = async (req,res, next) => {
    const registerSchema = joi.object({
        userName: joi.string().min(3).max(15).required(),
        firstName: joi.string().min(4).max(15).required(),
        lastName: joi.string().min(4).max(15).required(),
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
        if (emailExist) {
           //return res.status(200).json({message: "This mail is already used"})
           return next(
            "This email is already taken"
          );
       
        }
    } catch (error) {
      //return  res.status(400).json({ message: error.message });
      return next(error);
    next();
    }

};

/*const accessValidation = async(req,res,next)=>{
  const id = req.headers.access_token;
  const user = await userData.findOne({where:{id}});
  if(user===null){
    return res.status(404).json('data is not found');
  }
 next()
};*/
module.exports  = {userValidation}




