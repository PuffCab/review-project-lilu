import dbConnection from "../utils/dbConnection";

async function getHospitals() {
  try {
    const db = await dbConnection();
    // const data = req.body;
    // console.log("data :>> ", data);
    const collection = await db.collection("hospitals");
    console.log("collection :>> ", collection);
    const result = await collection.find({}).toArray();
    console.log(result);

    console.log("Connected to MongoDB. Data from the collection:");
    return JSON.stringify(result);
  } catch (error) {
    console.error("Error connecting to the MongoDB database:", error);
  }
}

export default getHospitals;
