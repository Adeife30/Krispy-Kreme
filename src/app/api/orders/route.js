import { MongoClient } from "mongodb";

export async function GET(req) {
  const URI = "mongodb+srv://Adeife:UxluFsxWHIygBnef@krispy-kreme.rhrln.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(URI);

  try {
    await client.connect();
    const db = client.db("Krispy");
    const ordersCollection = db.collection("orders");

    // Fetch all orders from the database
    const orders = await ordersCollection.find().sort({ timestamp: -1 }).toArray();

    // Log the fetched orders
    console.log("Fetched orders:", orders);

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  } finally {
    await client.close();
  }
}
