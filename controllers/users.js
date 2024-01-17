const User = require('../models/userSchema')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

  
const signup = async (req,res) => {
    const {email,password,username,languagePreference} = req.body;
    try {
        if (!email || !password || !username || !languagePreference) {
            return res.status(400).json({ error: 'All fields are required!' });
          }

        const oldUser = await User.findOne({ email });
        if(oldUser)
        {
            return res.status(409).json({msg: "User already exists!"})
        }
        
        const hashedPassword = await bcrypt.hash(password,12);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            username,
            languagePreference,
        })

        const token =  jwt.sign(
            {
                email: newUser.email,
                id: newUser._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn:'5d'
            }
        )
        
        res.status(200).json({result: newUser,token})
        
        
    } catch (error) {
        return res.status(500).json({
            err: error, msg:"Internal server error!"
        })
    }
}

const login =  async (req,res) => {
    const {email,password} = req.body;
    try {
        if (!email && !password) {
            return res.status(400).json({ error: 'Provide full credentials!' });
          }
       
      const oldUser = await User.findOne({email})
      if(!oldUser)
      {
            return res.status(404).json({msg: "User does not exists!"})
      }
    
      const correctPassword = await bcrypt.compare(password,oldUser.password)
      if(!correctPassword)
      {
        return res.status(400).json({msg: "Invalid Credentials!"})
      }

      const token = jwt.sign({
        email: oldUser.email,
        id: oldUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '5d'
      })
    
      res.status(200).json({result: oldUser, token});
    } catch (error){
        return res.status(500).json({err: error, msg:"Internal server error!"})
    }
}

const getUserProfile = async (req,res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if(!user)
        {
            return res.status(404).json({msg: "User does not exists!"});
        }
        res.status(200).json({user});
    } catch (error) {
        return res.status(500).json({err: error,msg: "Internal server error!"})
    }
}

const userProfile =  async (req,res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndUpdate(id,req.body,{
            new: true,
            runValidators: true
        })
        if(!user){
            return res.status(404).json({msg: "User not found!"})
        }
        
        res.status(200).json({user});

    } catch (error) {
        return res.status(500).json({err: error, msg:"Internal server error!"});
    }
}

const deleteUSer = async(req,res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id)
        if(!user){
            return res.status(404).json({msg: "User does not exists!"});
        }

        res.status(200).json({user, msg:"User deleted successfully"})
    } catch (error) {
        return res.status(500).json({err: error, msg:"Internal server error!"})
    }
}

module.exports = {signup,login,getUserProfile,userProfile,deleteUSer};