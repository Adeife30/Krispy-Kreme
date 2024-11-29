
import { MongoClient } from "mongodb";

export async function POST(req) {
  const body = await req.json(); // Parse JSON payload
  const { email, password } = body;

  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: "Email and password are required" }),
      { status: 400 }
    );
  }

  const URI = "mongodb+srv://Adeife:UxluFsxWHIygBnef@krispy-kreme.rhrln.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(URI);

  try {
    await client.connect();
    const db = client.db("Krispy");
    const usersCollection = db.collection("users");

    // Find the user with the provided email
    const user = await usersCollection.findOne({ email });

    if (!user || user.password !== password) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401 }
      );
    }

    // Return the user role
    return new Response(
      JSON.stringify({ role: user.role }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
