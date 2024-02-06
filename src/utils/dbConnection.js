// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// let cachedDb;

// async function dbConnection() {
//   if (cachedDb) {
//     return cachedDb;
//   }

//   await client.connect();
//   const db = client.db();

//   cachedDb = db;
//   return db;
// }

// export default dbConnection;

import { MongoClient } from "mongodb";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

const dbConnection = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  // Connect to the database:
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default dbConnection;
