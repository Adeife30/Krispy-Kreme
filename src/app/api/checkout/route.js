import { MongoClient } from "mongodb";

export async function POST(req) {
  const body = await req.json();
  const { userId, customerName, customerEmail } = body;

  if (!userId || !customerName || !customerEmail) {
    return new Response(
      JSON.stringify({ error: "User ID, name, and email are required" }),
      { status: 400 }
    );
  }

  const uri = "mongodb+srv://Adeife:UxluFsxWHIygBnef@krispy-kreme.rhrln.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("Krispy");
    const cartCollection = db.collection("shopping_cart");
    const ordersCollection = db.collection("orders");

    // Fetch cart items
    const cartItems = await cartCollection.find({ userId }).toArray();
    if (cartItems.length === 0) {
      return new Response(JSON.stringify({ error: "Cart is empty" }), { status: 400 });
    }

    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create order
    const order = {
      customerName,
      customerEmail,
      products: cartItems.map((item) => ({
        name: item.pname,
        quantity: item.quantity,
        price: item.price,
      })),
      total,
      timestamp: new Date(),
    };

    await ordersCollection.insertOne(order);
    await cartCollection.deleteMany({ userId });

    return new Response(
      JSON.stringify({ message: "Order placed successfully", orderId: order._id }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during checkout:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  } finally {
    await client.close();
  }
}
