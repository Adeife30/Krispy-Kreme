
import { NextResponse } from "next/server";
import connectToDatabase from "../../../utils/mongodb";

export async function GET() {
  const { db } = await connectToDatabase();
  const orders = await db.collection("orders").find({}).toArray();
  return NextResponse.json(orders);
}
