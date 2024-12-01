
import { MongoClient } from "mongodb";
import { getCustomSession } from "../saveData/sessionCode";


export async function POST(req) {
  const { email, password } = await req.json(); // Parse request body

  // MongoDB connection URI
  const URI = "mongodb+srv://Adeife:UxluFsxWHIygBnef@krispy-kreme.rhrln.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(URI);

  try {
    await client.connect();
    const db = client.db("Krispy");
    const usersCollection = db.collection("users");

    // Find user in the database
    const user = await usersCollection.findOne({ email, password });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401 }
      );
    }

    // Set session
    const session = await getCustomSession();
    session.role = user.role; // Use the role from the database
    session.email = user.email; // Use the email from the database
    await session.save();

    return new Response(
      JSON.stringify({ message: "Login successful", role: user.role }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  } finally {
    await client.close(); // Ensure the client is closed
  }
}
