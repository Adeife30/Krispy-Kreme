import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export async function getCustomSession() {
  console.log('Initializing session...');

  // Password used to encrypt the session (should be stored securely in a real app)
  let pw = 'VIi8pH38vD8ZLgEZclSa7an3olx4pkh6pvBj9fGZf';

  const session = await getIronSession(cookies(), { password: pw, cookieName: 'app' });

  return session;
}
