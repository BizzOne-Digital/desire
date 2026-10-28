// Creates or updates the admin login in MongoDB Atlas.
// Usage:  ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='a-long-password' npm run admin:create
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

for (const file of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(file);
  } catch {
    // file not present
  }
}

const uri = process.env.DATABASE_URL;
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!uri || !email || !password) {
  console.error("Set DATABASE_URL (in .env), ADMIN_EMAIL and ADMIN_PASSWORD first.");
  process.exit(1);
}
if (password.length < 10) {
  console.error("ADMIN_PASSWORD must be at least 10 characters.");
  process.exit(1);
}

const dbName = uri.split("/").pop()?.split("?")[0] || "only_collection";

async function main() {
  const client = new MongoClient(uri!);
  await client.connect();
  const now = new Date();
  await client
    .db(dbName)
    .collection("AdminUser")
    .updateOne(
      { email },
      {
        $set: { passwordHash: await bcrypt.hash(password!, 12), updatedAt: now },
        $setOnInsert: { email, name: "Admin", role: "OWNER", createdAt: now }
      },
      { upsert: true }
    );
  await client.close();
  console.log(`Admin ready: ${email} (database: ${dbName})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
