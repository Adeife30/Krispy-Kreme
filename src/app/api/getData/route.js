import { getCustomSession } from "../saveData/sessionCode";

export async function GET(req) {
  const session = await getCustomSession();

  // Retrieve session data
  const role = session.role || null;
  const email = session.email || null;

  console.log("Session data retrieved:", { role, email });

  return new Response(
    JSON.stringify({ role, email }),
    { status: 200 }
  );
}
