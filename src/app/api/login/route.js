
import connectMongo from '@/lib/mongodb';
import User from '@/User';
import { serialize } from 'cookie';  // For setting cookies in the response

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: 'Please provide both email and password.' }),
      { status: 400 }
    );
  }

  // Connect to MongoDB
  await connectMongo();

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404 }
      );
    }

    // Compare hashed password with the input
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return new Response(
        JSON.stringify({ error: 'Invalid password' }),
        { status: 400 }
      );
    }

    // Set up a session cookie (optional, for simple session management)
    const sessionCookie = serialize('session', user._id.toString(), {
      httpOnly: true,  // Cannot be accessed via JavaScript
      secure: process.env.NODE_ENV === 'production',  // Only set cookie on HTTPS in production
      maxAge: 60 * 60 * 24,  // 1 day
      path: '/',
    });

    const response = new Response(
      JSON.stringify({ message: 'Login successful' }),
      { status: 200 }
    );
    response.headers.set('Set-Cookie', sessionCookie);
    return response;
    
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'An error occurred during login' }),
      { status: 500 }
    );
  }
}
