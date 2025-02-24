import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { generateToken, setToken } from "../../../utils/token";
import bcrypt from "bcryptjs"; // Import bcrypt for password comparison

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Connect to the MongoDB database
    await client.connect();
    const db = client.db("team_manager_db");
    const collection = db.collection("register_user");

    // Find the user with the matching email
    const user = await collection.findOne({ email });

    // If user is not found or password is incorrect
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Compare hashed password with provided password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate JWT token for the user
    const token = generateToken({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePic: user.profilePic, // Ensure correct field is used
      contact: user.contact,
    });

    const res = NextResponse.json({
      success: true,
      message: "Login successful!",
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePic: user.profilePic,
        contact: user.contact,
      },
    });

    // Set the token in the cookie
    setToken(res, token);

    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to log in. Please try again later.",
    });
  } finally {
    await client.close();
  }
}
