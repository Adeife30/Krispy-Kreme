import { MongoClient } from "mongodb";

export async function GET(req) {
  // MongoDB connection string
  const uri = "mongodb+srv://Adeife:UxluFsxWHIygBnef@krispy-kreme.rhrln.mongodb.net/?retryWrites=true&w=majority&appName=Krispy-kreme";
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB database
    await client.connect();
    const db = client.db("Krispy"); // Replace with your actual database name
    const collection = db.collection("products"); // Replace with your actual collection name

    // Fetch all products from the database
    const products = await collection.find({}).toArray();

    // Return the products as a JSON response
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  } finally {
    // Ensure the client is closed
    await client.close();
  }
}
