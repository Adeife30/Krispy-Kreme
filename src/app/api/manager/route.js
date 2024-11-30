import { getCustomSession } from '../sessionCode.js';

export async function GET(req) {
  const session = await getCustomSession();

  if (session.role !== 'manager') {
    return new Response(
      JSON.stringify({ error: 'Unauthorized. Only managers can access this page.' }),
      { status: 401 }
    );
  }

  // Fetch and return manager data (e.g., orders)
  return new Response(
    JSON.stringify({ message: 'Welcome, Manager!' }),
    { status: 200 }
  );
}
