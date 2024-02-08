import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
