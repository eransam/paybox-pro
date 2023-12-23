import { Document, model, Schema } from "mongoose";
export interface IUserPayBox extends Document {
  firstName: string;
  lastName: string;
  userId: number;
  money: number;
}

const UserPayBoxSchema = new Schema<IUserPayBox>(
  {
    firstName: {
      type: String,
      required: [true, "Missing  first name"],
      minlength: [2, "First name too short"],
      maxlength: [100, "First name too long"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Missing last name"],
      minlength: [2, "Last name too short"],
      maxlength: [100, "Last name too long"],
      trim: true,
    },
    userId: {
      type: Number,
      required: [true, "Missing userId"],
    },
    money: {
      type: Number,
      required: [true, "Missing money"],
      trim: true,
    },
  },
  {
    versionKey: false,
  }
);

export const UserPayBox = model<IUserPayBox>(
  "UserPayBox",
  UserPayBoxSchema,
  "usersPayBox"
);
