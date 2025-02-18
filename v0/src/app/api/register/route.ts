import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
console.log("inside a route file");
// Fetching the MongoDB URI from environment variables
const uri = process.env.MONGODB_URI;

export async function POST(req: Request) {
  const client = new MongoClient(uri as string);

  try {
    // Parse the request body
    const body = await req.json();

    // Connect to the MongoDB database
    await client.connect();
    const db = client.db("team_manager_db");
    const collection = db.collection("register_user");

    // Insert the form data into MongoDB
    const result = await collection.insertOne(body);

    // Return a success response
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ success: false, message: "Failed to register" });
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}
