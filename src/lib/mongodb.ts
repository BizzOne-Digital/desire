import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/only_collection";
const dbName = uri.split("/").pop()?.split("?")[0] || "only_collection";

const globalForMongo = globalThis as unknown as {
  mongoClientPromise?: Promise<MongoClient>;
};

// Cache the connection promise for every environment so warm serverless
// invocations (Vercel + Atlas) reuse one connection instead of opening a new one per request.
export async function getMongoDb() {
  if (!globalForMongo.mongoClientPromise) {
    globalForMongo.mongoClientPromise = new MongoClient(uri, { maxPoolSize: 5 })
      .connect()
      .catch((error) => {
        globalForMongo.mongoClientPromise = undefined;
        throw error;
      });
  }

  const client = await globalForMongo.mongoClientPromise;
  return client.db(dbName);
}

export { ObjectId };
