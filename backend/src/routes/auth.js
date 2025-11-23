const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of data
    // validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;
console.log(req.body);
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    //   Creating a new instance of the User model
    console.log(firstName);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
       
    const savedUser = await user.save();
    console.log("user saves");
    const token = await savedUser.getJWT();
 console.log("getjwt");
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.json({ message: "User Added successfully!", data: savedUser });
  } catch (err) {
    console.log("errror");
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
     console.log(emailId, password);
    const user = await User.findOne({ emailId: emailId });
    console.log(user);
    if (!user) {
      console.log("user is error");
      throw new Error("Invalid credentials");
    }
       const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
         console.log("passwrod to valid hai");
      const token = await user.getJWT();

      res.cookie("token", token, {
         httpOnly: true,
        secure: false,  // should be false for localhost
  
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.json(user);
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful!!");
});

module.exports = authRouter;
