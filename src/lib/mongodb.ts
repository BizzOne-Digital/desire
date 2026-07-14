import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/only_collection";
const dbName = uri.split("/").pop()?.split("?")[0] || "only_collection";

const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient;
};

export async function getMongoDb() {
  const client = globalForMongo.mongoClient ?? new MongoClient(uri);

  if (!globalForMongo.mongoClient) {
    await client.connect();
    if (process.env.NODE_ENV !== "production") {
      globalForMongo.mongoClient = client;
    }
  }

  return client.db(dbName);
}

export { ObjectId };
