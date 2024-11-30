import { MongoClient } from "mongodb";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const pname = searchParams.get("pname");
  const userId = searchParams.get("userId");

  if (!pname || !userId) {
    return new Response(
      JSON.stringify({ error: "Missing required parameters: pname or userId" }),
      { status: 400 }
    );
  }

  const uri = "mongodb+srv://Adeife:UxluFsxWHIygBnef@krispy-kreme.rhrln.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("Krispy");
    const cartCollection = db.collection("shopping_cart");
    const productsCollection = db.collection("products");

    // Check if the product exists and get its price
    const product = await productsCollection.findOne({ name: pname });
    if (!product) {
      return new Response(
        JSON.stringify({ error: `Product '${pname}' not found` }),
        { status: 404 }
      );
    }

    const price = product.price;

    // Check if the item is already in the user's cart
    const existingItem = await cartCollection.findOne({ userId, pname });

    if (existingItem) {
      // Update quantity and price if the item already exists
      await cartCollection.updateOne(
        { userId, pname },
        { $set: { price }, $inc: { quantity: 1 } }
      );
    } else {
      // Insert a new item into the cart if it doesn't exist
      await cartCollection.insertOne({
        userId,
        pname,
        price,
        quantity: 1,
        addedAt: new Date(), // Optional: Add timestamp for when the item was added
      });
    }

    return new Response(
      JSON.stringify({ message: `Product '${pname}' added to cart successfully` }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding to cart:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
