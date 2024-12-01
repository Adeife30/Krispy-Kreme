import { getCustomSession } from "../../sessionCode";

export async function POST(req) {
  const { email, role } = await req.json(); // Expecting email and role from frontend
  if (!email || !role) {
    return new Response(JSON.stringify({ error: "Missing email or role" }), { status: 400 });
  }

  const session = await getCustomSession();
  session.email = email;
  session.role = role;
  await session.save();

  return new Response(JSON.stringify({ message: "Session data saved" }), { status: 200 });
}
