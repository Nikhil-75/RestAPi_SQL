const userData = require('../models/userModel');
const bcrypt = require('bcrypt');

const salt = 10;



exports.userRegister = async(req,res)=>{
    const {username, firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, salt);
    try{
    const user = new  userData({
        username,
        firstName,
        lastName,
        email,
        password:hashedPassword
      });
      
        const data = await user.save();
        res.status(200).json({message:'user registered successfully',user_id:data.dataValues.id})
      } catch (err) {
        res.status(400).json({message:err.message})
      }
};
