// app/api/products/route.js
import { NextResponse } from "next/server";
import connectToDatabase from "../../../utils/mongodb";

export async function GET() {
  const { db } = await connectToDatabase();
  const products = await db.collection("products").find({}).toArray();
  return NextResponse.json(products);
}
