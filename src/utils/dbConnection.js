import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
console.log("uri :>> ", uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
});

let cachedDb;

async function dbConnection() {
  if (cachedDb) {
    return cachedDb;
  }

  await client.connect();
  const db = client.db();

  cachedDb = db;
  return db;
}

export default dbConnection;
