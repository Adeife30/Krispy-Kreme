import { MongoClient } from "mongodb";

export async function POST(req) {
  const body = await req.json(); // Parse the JSON payload
  const { userId, customerName, customerEmail } = body;

  // Validate request body
  if (!userId || !customerName || !customerEmail) {
    console.error("Missing required fields in request body:", body);
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
      console.warn(`Cart is empty for userId: ${userId}`);
      return new Response(
        JSON.stringify({ error: "Cart is empty" }),
        { status: 400 }
      );
    }

    // Calculate the total price
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create an order object
    const order = {
      customerName,
      customerEmail,
      userId,
      products: cartItems.map((item) => ({
        name: item.pname,
        quantity: item.quantity,
        price: item.price,
      })),
      total,
      timestamp: new Date().toISOString(),
    };

    // Insert the order into the orders collection
    const result = await ordersCollection.insertOne(order);
    console.log("Order successfully saved with ID:", result.insertedId);

    // Clear the user's cart
    const deleteResult = await cartCollection.deleteMany({ userId });
    console.log(`Cart cleared for userId: ${userId}. Deleted ${deleteResult.deletedCount} items.`);

    // Respond with success
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
