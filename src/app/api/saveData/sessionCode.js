import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

const sessionOptions = {
  password: "VIi8pH38vD8ZLgEZclSa7an3olx4pkh6pvBj9fGZf", // Secure session password
  cookieName: "app-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export async function getCustomSession() {
  console.log("Loading session...");
  return getIronSession(cookies(), sessionOptions);
}
