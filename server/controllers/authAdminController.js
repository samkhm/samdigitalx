const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) =>{
    
try {
    const { first_name, last_name, email, phone,
        password
    } = req.body;

    const emailExist = await User.findOne({ email });
    if(emailExist) return res.status(401).json({ message: "User Already Exist"});
    
    const admins = await User.find();
    
    if (admins.length > 0) {
        const existingAdmin = await User.findOne({ role: "admin" });
        if (existingAdmin) {
          return res.status(401).json({ message: "Only one admin is allowed, sorry!" });
        }
      }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ first_name, last_name, email, phone,
        password: hashed});

    const token = jwt.sign({ id: user._id, role: user.role, email:user.email, first_name: user.first_name}, process.env.JWT_SECRET, {
        expiresIn: '24h'
    });
    res.json({ token });
    
} catch (error) {
    console.log("Failed to connect server", error);
    
}
};

exports.login = async (req, res) =>{
    try {
        const { email, password} = req.body;

        const user = await User.findOne({ email });
        if(!user) return res.status(404).json({ message: "Email not found"});

        const passMatch = await bcrypt.compare(password, user.password);
        if(!passMatch) return res.status(401).json({ message: "Incorrect password"});

        const token = jwt.sign({ id: user._id, role: user.role, email: user.email, first_name: user.first_name}, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });

        res.json({ token });
        
    } catch (error) {
        console.log("Failed to connect server", error);
        
    }

};

exports.getUsers = async (req, res) => {
    try {
  
      const users = await User.find()
      if (!users) return res.json({ message: "No Users" })
      res.json({ users })
  
    } catch (error) {
      console.error(error)
    }
  }


  
//reset of password, 1. confirm email

exports.cornfirmIdentifier = async (req, res) => {  
    try {
      const { identifier } = req.body;
  
      const userExist = await User.findOne(
        
          
          { email: identifier }
        
      );
  
      if (!userExist){
        res.status(404).json({ message : "User not found!"})
      }
  
      return res.status(200).json({ message : "Success", userId: userExist._id})
      
    } catch (error) {
      res.status(500).json({ message: "Server error" })    
    }
  }
  
  
  
  exports.resetPassword = async (req, res) => {
    try {
      const { id } = req.params;
      const { password } = req.body;
  
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }
  
      const trimmedPassword = password.trim();
  
      if (trimmedPassword.length < 6) {
        return res.status(400).json({ message: "Password too short" });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(trimmedPassword, 10);
  
      const user = await User.findByIdAndUpdate(
        id,
        { password: hashedPassword },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "Password reset successful" });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  
  exports.updateUserInfo = async (req, res) => {
    console.log(req.body)
    try {
      const { first_name, last_name, email, phone, role } = req.body
  
      const updateData = {}
      if (first_name) updateData.first_name = first_name.trim()
      if (last_name) updateData.last_name = last_name.trim()
      if (email) updateData.email = email.trim()
      if (phone) updateData.phone = phone.trim()
      if (role) updateData.role = role.trim()
  
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          message: "No valid fields provided for update",
        })
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      )
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" })
      }
  
      // ✅ Return the full updated user
      return res.status(200).json({
        message: "User updated successfully",
        updatedUser, // <--- this is critical
      })
    } catch (err) {
      console.error("Update user error:", err)
      res.status(500).json({ message: "Server error" })
    }
  }
    
  
  exports.deleteUser = async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
  
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json({
        message: "User deleted successfully",
        deletedUserId: deletedUser._id, // <-- send ID for frontend
      });
    } catch (err) {
      console.error("Delete user error:", err);
      res.status(500).json({ message: "Server error" });
    }
  }

  
  exports.getProfile = async (req, res) => {
    const { id } = req.params; // ✅ correct param
  
    try {
      const profile = await User.findById(id).select(
        "username first_name last_name email phone"
      );
  
      if (!profile) {
        return res.status(404).json({ message: "Profile not found!" });
      }
  
      return res.status(200).json({ profile });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  
  exports.updateProfile = async (req, res) => {
    const { id } = req.params;
    const { username, first_name, last_name, email, phone } = req.body;
  
    try {
      const updatedProfile = await User.findByIdAndUpdate(
        id,
        {
          username,
          first_name,
          last_name,
          email,
          phone,
        },
        {
          new: true,        // return updated doc
          runValidators: true,
        }
      ).select("username fname lname email phone");
  
      if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found!" });
      }
  
      return res.status(200).json({
        profile: updatedProfile,
        response: { message: "Profile updated successfully" },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  