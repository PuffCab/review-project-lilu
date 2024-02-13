// import { encryptPassword } from "@/utils/encryptPassword";
// import clientPromise from "@/utils/mongodb";
// import userSchema from "../../models/userSchema"; 

export default async function registerUser(req, res) {

        try {
        //     let { email, password } = req.body;
        //     email = email.toLowerCase();

        //   if (!email && !password) {
        //     res.status(405).json(
        //       {
        //         message:'Please,provide your email and password'
        //       }
        //     )
        //   }

            const client = await clientPromise;
            const db = client.db("e-learning");

            // const existingUser = await db.collection("users").findOne({ email: email });
            if (existingUser) {
                return res.status(409).json({ message: "Email already exists" });
            }

            const hashedPassword = await encryptPassword(password);

           
            const newUser = {
                ...userSchema,
                
                email: email,
                password: hashedPassword
            };

            await db.collection("users").insertOne(newUser);

            res.status(200).json({ message: "User registered successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }

}





import { UserModel } from '@/models/Schemas';
import dbConnect from '@/utils/dbConnect';
import { encryptPassword } from '@/utils/encryptPassword';

export default async function registerUser(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  await dbConnect();

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password.' });
  }

  try {
    
    const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists." });
    }

    
    const hashedPassword = await encryptPassword(password);
z
   
    const newUser = await UserModel.create({
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    return res.status(200).json({ message: "User registered successfully.", userId: newUser._id });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}