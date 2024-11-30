import { getCustomSession } from '../sessionCode.js';

export async function GET(req) {
  let session = await getCustomSession();

  // Retrieve data from the session
  let customersRole = session.role;
  let email = session.email;

  console.log('Retrieved session data:', { role: customersRole, email });

  return new Response(
    JSON.stringify({ role: customersRole, email }),
    { status: 200 }
  );
}
