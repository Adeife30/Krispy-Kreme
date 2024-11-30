import { getCustomSession } from '../sessionCode.js';

export async function GET(req) {
  let session = await getCustomSession();

  // Save data to the session
  session.role = 'customer'; // Example: Set role
  session.email = 'mymail@mail.com'; // Example: Set email

  // Save the session changes
  await session.save();

  console.log('Session data saved:', { role: session.role, email: session.email });

  return new Response(JSON.stringify({ message: 'Session data saved' }), { status: 200 });
}
