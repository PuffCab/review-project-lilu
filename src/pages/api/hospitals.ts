// import dbConnection from "../../utils/dbConnection";
// import { MongoClient } from "mongodb";

// async function getHospitals() {
//   try {
//     const db = await dbConnection();
//     // const data = req.body;
//     // console.log("data :>> ", data);
//     const collection = await db.collection("hospitals");
//     console.log("collection :>> ", collection);
//     const result = await collection.find({}).toArray();
//     console.log(result);
//     console.log("Connected to MongoDB. Data from the collection:");

//     return result;
//   } catch (error) {
//     console.error("Error connecting to the MongoDB database:", error);
//     throw error;
//   }
// }

// export default getHospitals;



import { dbConnection } from "../../utils/dbConnection";
import { MongoClient } from "mongodb";

export default async (req, res) => {
  try {
    const collection = await dbConnection;
    const db = collection.db("hospitals");

    const hospitals = await db
      .collection("hospitals")
      .find({})
      // .sort({ metacritic: -1 })
      // .limit(10)
      .toArray();

    res.json(hospitals);
  } catch (e) {
    console.error(e);
  }
};
