import mongoose, { Schema, model, models, Document } from "mongoose";
import bcrypt from "bcryptjs";

// Define IUser interface
export interface IUser extends Document {
  _id: mongoose.Schema.Types.ObjectId; // Explicitly define `_id`
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  contact?: string;
  createdAt: Date;
  updatedAt: Date;
  profilepic: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

// Define User Schema
const userSchema = new Schema<IUser>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true }, // Ensure auto-generation
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      match: [
        /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/,
        "Invalid email format",
      ],
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: [true, "password is required"] },
    firstname: {
      type: String,
      required: [true, "firstname is required"],
      match: [/^[A-Za-z]+([ '-][A-Za-z]+)*$/, "Invalid first name"],
    },
    lastname: {
      type: String,
      required: [true, "lastname is required"],
      match: [/^[A-Za-z]+([ '-][A-Za-z]+)*$/, "Invalid last name"],
    },
    contact: {
      type: String,
      match: [
        /^(?:\+?(\d{1,4})[-.\s]?)?(?:\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}$/,
        "Invalid contact number",
      ],
    },
    profilepic: {
      type: String,
      required: [true, "Profile picture is required"],
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt`
  }
);

// Pre-save hook for email normalization
userSchema.pre("save", function (next) {
  if (this.isModified("email")) {
    this.email = this.email.toLowerCase();
  }
  next();
});

// Pre-save hook to hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare passwords (for login)
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Export User Model
const User = models?.User || model<IUser>("User", userSchema, "register_user");

export default User;
