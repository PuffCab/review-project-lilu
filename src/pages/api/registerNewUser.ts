import UsersModel from "../../models/usersModel"
import dbConnection from "../../utils/dbConnection";
import { hashPassword } from "../../utils/passwordServices"
import { MongoClient } from "mongodb";
import mongoose from "mongoose";


// const registerNewUser = async (req, res) => {
//   const dbConnect = await dbConnection();

// try {

//   const {name, email, password} = req.body;

//   if (!email || !password){
//     res.status(405).json({
//       message: "You need to provide an email and password"
//     })
//   }
//   // const database =  dbConnect.db("lilu2");

// const existingUser = await dbConnect.collection("userProfiles").find({ email: email })

// // const existingUser = await UsersModel.find({email:email})

// // if (existingUser) {
// //   res.status(200).json({
// //     message: "This email already exists in the database "
// //   })
// // }

// const hashedPassword = await hashPassword(password);

// if (hashedPassword) {

//   try {
//     const newUser = new UsersModel({
//       name: name,
//       email: email,
//       password: hashedPassword,

//     });

//     console.log("newUser :>> ", newUser);

//     const savedUser =  newUser.save()
//     res.status(201).json({
//       message: "New user registered",
//       user: savedUser
//     });
//     console.log('savedUser :>> ', savedUser);
//   } catch (error) {
//     console.log("error saving user :>> ", error);
//     res.status(500).json({
//       message: "something went wrong when registering your user",
//     });
//   }
// }

// } catch (error) {
 
//   console.log("error :>> ", error);
//   res.status(500).json({
//     message: "Oh no, it went wrong!",
//   });
// }
  

// }

const registerNewUser = async (req, res) => {
  const client = await dbConnection();

  // await client.connect();

  // const db = client.db('lilu2')

try {

  const {name, email, password} = req.body;

  if (!email || !password){
    res.status(405).json({
      message: "You need to provide an email and password"
    })
  }

// const existingUser = await dbConnect.collection("userProfiles").find({ email: email })


const hashedPassword = await hashPassword(password);

if (hashedPassword) {

  try {
    const newUser = new UsersModel({
      name: name,
      email: email,
      password: hashedPassword,

    });

    console.log("newUser :>> ", newUser);

    const savedUser = await client.collection("users").insertOne(newUser);


    res.status(201).json({
      message: "New user registered",
      user: savedUser
    });
    console.log('savedUser :>> ', savedUser);
  } catch (error) {
    console.log("error saving user :>> ", error);
    res.status(500).json({
      message: "something went wrong when registering your user",
    });
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