import dbConnection from "../../utils/dbConnection";

async function getHospitals(req, res) {
  try {
    const db = await dbConnection();
    const collection = await db.collection("hospitals");
    console.log("collection :>> ", collection);
    const allHospitals = await collection.find({}).toArray();

    res.status(200).json(allHospitals);

    console.log("Connected to MongoDB", allHospitals);
    console.log("Connected to MongoDB. Data from the collection:");

    // return result;
  } catch (error) {
    console.error("Error connecting to the MongoDB database:", error);
    res.status(500).json({ error: "Failed to connect to the database" });
  }
}

export default getHospitals;