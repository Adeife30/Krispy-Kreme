import { MongoClient } from "mongodb";

export async function POST(req) {
  const body = await req.json(); // Parse the JSON payload
  const { userId, customerName, customerEmail } = body;

  if (!userId || !customerName || !customerEmail) {
    return new Response(
      JSON.stringify({ error: "User ID, name, and email are required" }),
      { status: 400 }
    );
  }

  const URI = "mongodb+srv://Adeife:UxluFsxWHIygBnef@krispy-kreme.rhrln.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(URI);

  try {
    await client.connect();
    const db = client.db("Krispy");
    const cartCollection = db.collection("shopping_cart");
    const ordersCollection = db.collection("orders");

    // Retrieve cart items for the user
    const cartItems = await cartCollection.find({ userId }).toArray();

    if (cartItems.length === 0) {
      return new Response(
        JSON.stringify({ error: "Cart is empty" }),
        { status: 400 }
      );
    }

    // Calculate the total price
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create an order
    const order = {
      customerName,
      customerEmail,
      products: cartItems.map((item) => ({
        name: item.pname,
        quantity: item.quantity,
        price: item.price,
      })),
      total,
      timestamp: new Date().toISOString(),
    };

    const result = await ordersCollection.insertOne(order);

    // Clear the user's cart
    await cartCollection.deleteMany({ userId });

    return new Response(
      JSON.stringify({
        message: "Order placed successfully",
        orderId: result.insertedId,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during checkout:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
