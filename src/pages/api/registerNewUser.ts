import {UserModel} from "@/models/userModel";
import dbConnection from "@/utils/dbConnection";
import { hashPassword, verifyPassword } from "@/utils/passwordServices"


const registerNewUser = async (req, res) => {

try {

  const {email, password} = req.body;

  if (!email && !password){
    res.status(405).json({
      message: "You need to provide an email and password"
    })
  }
  const db = await dbConnection();
  const userCollection = await db.collection("userProfiles")

const existingUser = await userCollection.find({email: email})

if (existingUser) {
  res.status(200).json({
    message: "This email already exists in the database "
  })
}
  
} catch (error) {
  
}





   try {
     const hashedPassword = await hashPassword(req.body.password);
 
     if (hashedPassword) {
       const existingUser = await UserProfileModel.findOne({ email: req.body.email });
 
       if (existingUser) {
         res.status(200).json({
           message: "email already exists in the db",
         });
       } else {
         try {
           const newUser = new UserProfileModel({
             email: req.body.email,
             password: hashedPassword,

           });
 
           console.log("newUser :>> ", newUser);
 
           const savedUser = await newUser.save();
           res.status(201).json({
             message: "New user registered",
             user: {
               _id: savedUser._id,
               email: savedUser.email,
             },
           });
         } catch (error) {
           console.log("error saving user :>> ", error);
           res.status(500).json({
             message: "something went wrong when registering your user",
           });
         }
       }
     }
   } catch (error) {
     console.log("error :>> ", error);
     res.status(500).json({
       message: "Oh no, it went wrong!",
     });
   }

}

export default registerNewUser;