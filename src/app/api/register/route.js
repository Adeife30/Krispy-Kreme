import { MongoClient } from "mongodb";

export async function POST(req) {
  const body = await req.json(); // Parse JSON payload
  const { name, email, password, role } = body;

  // Validate required fields
  if (!name || !email || !password || !role) {
    return new Response(
      JSON.stringify({ error: "All fields are required" }),
      { status: 400 }
    );
  }

  const URI = "mongodb+srv://Adeife:UxluFsxWHIygBnef@krispy-kreme.rhrln.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(URI);
  const dbName = "Krispy";

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const usersCollection = db.collection("users");

    // Check if the email already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Email already registered" }),
        { status: 409 }
      );
    }

    // Insert the new user
    const result = await usersCollection.insertOne({ name, email, password, role });
    console.log("User registered:", result.insertedId);

    return new Response(
      JSON.stringify({
        message: "User registered successfully",
        id: result.insertedId,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
