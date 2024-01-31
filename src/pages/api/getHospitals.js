import dbConnection from "../../utils/dbConnection";

async function getHospitals() {
  try {
    const db = await dbConnection();
    const collection = db.collection("lilu2.hospitals");
    console.log("collection :>> ", collection);
    const result = await collection.find({}).toArray();

    console.log("Connected to MongoDB. Data from the collection:");
    console.log(result);
  } catch (error) {
    console.error("Error connecting to the MongoDB database:", error);
  }
}

export default getHospitals;

// pages/api/getHospitals.js

// import dbConnection from '../utils/dbConnection';

// export default async function handler(req, res) {
//   const db = await dbConnection();

//   try {
//     const collection = db.collection('yourCollectionName');
//     const data = await collection.find({}).toArray();

//     res.status(200).json(data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }
