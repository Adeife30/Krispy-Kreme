import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;  // Get the MongoDB URI from the .env.local file
let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable to prevent creating multiple MongoDB connections
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = MongoClient.connect(MONGO_URI);
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new connection for each request
  clientPromise = MongoClient.connect(MONGO_URI);
}

export async function connectToDatabase() {
 const client = await clientPromise;
  const db = client.db();  // Default database (you can specify a database name if you want)
  return db;
}
