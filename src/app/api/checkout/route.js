import { MongoClient } from "mongodb";

export async function POST(req) {
  try {
    // Parse the JSON payload from the request body
    const body = await req.json();
    const { userId, customerName, customerEmail } = body;

    // Validate input
    if (!userId || !customerName || !customerEmail) {
      return new Response(
        JSON.stringify({ error: "User ID, customer name, and email are required." }),
        { status: 400 }
      );
    }

    // MongoDB connection URI
    const URI = "mongodb+srv://Adeife:UxluFsxWHIygBnef@krispy-kreme.rhrln.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(URI);

    await client.connect();
    const db = client.db("Krispy");
    const cartCollection = db.collection("shopping_cart");
    const ordersCollection = db.collection("orders");

    // Fetch items from the user's cart
    const cartItems = await cartCollection.find({ userId }).toArray();
    console.log("Cart items:", cartItems);

    if (cartItems.length === 0) {
      return new Response(
        JSON.stringify({ error: "Cart is empty. Please add items to your cart before checking out." }),
        { status: 400 }
      );
    }

    // Calculate the total price
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create the order object
    const order = {
      userId,
      customerName,
      customerEmail,
      products: cartItems.map((item) => ({
        name: item.pname,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
      timestamp: new Date().toISOString(),
    };

    // Insert the order into the orders collection
    const result = await ordersCollection.insertOne(order);
    console.log("Order placed successfully with ID:", result.insertedId);

    // Clear the user's cart
    const deleteResult = await cartCollection.deleteMany({ userId });
    console.log("Cart cleared for user:", deleteResult);

    // Return success response
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
  }
}
