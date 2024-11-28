import { MongoClient } from "mongodb";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response(
      JSON.stringify({ error: "User ID is required" }),
      { status: 400 }
    );
  }

  const uri = "mongodb+srv://Adeife:UxluFsxWHIygBnef@krispy-kreme.rhrln.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("Krispy");
    const collection = db.collection("shopping_cart");

    // Fetch items for the specified user
    const cartItems = await collection.find({ userId }).toArray();

    return new Response(JSON.stringify(cartItems), { status: 200 });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  } finally {
    await client.close();
  }
}
