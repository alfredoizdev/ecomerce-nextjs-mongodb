import { Schema, Document, model, Model, models } from "mongoose";
import { Password } from "../utils/password";

export interface IUser {
  email: string;
  password: string;
  role: string;
  name: string;
}

interface IUserModel extends Model<IUserDoc> {
  build(attrs: IUser): IUserDoc;
}

interface IUserDoc extends Document, IUser {
  createdAt?: string;
  updatedAt?: string;
}

export const userSchema = new Schema<IUserDoc, IUserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }

  done();
});

// Define the static `build` method
userSchema.statics.build = (attrs: IUser) => {
  return new User(attrs);
};

// Customize the `toJSON` method
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password; // Remove password from the JSON response
  },
});

// Check if the model already exists in `models`
const User = (models.User ||
  model<IUserDoc, IUserModel>("User", userSchema)) as IUserModel;

export default User;
