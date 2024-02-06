import hospitals from "@/pages/api/hospitals";
import dbConnection from "../utils/dbConnection";

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
//     return JSON.stringify(result);
//   } catch (error) {
//     console.error("Error connecting to the MongoDB database:", error);
//   }
// }

// export default getHospitals;

export default function Hospitals({ hospitals }) {
  return (
    <div>
      <h1>All hospitals</h1>
      <p>
        <small>(According to location)</small>
      </p>
      <ul>
        {hospitals.map((hospital) => (
          <li>
            <h2>{hospital.name}</h2>
            <h3>{hospital.address}</h3>
            <p>{hospital.birthsPerYear} births per year</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export async function getServerSideProps(context) {
  try {
    const db = await dbConnection();
    const collection = db.collection("hospitals");

    const hospitals = await collection
      .find({})
      //   .sort({ metacritic: -1 })
      .toArray();

    return {
      props: { hospitals },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { hospitals: [] },
    };
  }
}
