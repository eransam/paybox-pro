import { Document, model, Schema } from "mongoose";
export interface IHistoryPayBox extends Document {
  userIdExport: number;
  firstName_user_export: String;
  lastName_user_export: String;
  userIdImport: number;
  firstName_user_Import: String;
  lastName_user_Import: String;
  moneyToTransfer: number;
}
const HistoryPayBoxSchema = new Schema<IHistoryPayBox>(
  {
    userIdExport: {
      type: Number,
      required: [true, "Missing userId"],
    },
    userIdImport: {
      type: Number,
      required: [true, "Missing userId"],
      ref: "UserPayBox",
    },
    moneyToTransfer: {
      type: Number,
      required: [true, "Missing money"],
    },
    firstName_user_export: String,
    lastName_user_export: String,
    firstName_user_Import: String,
    lastName_user_Import: String,
  },

  {
    versionKey: false,
  }
);

export const HistoryPayBox = model<IHistoryPayBox>(
  "HistoryPayBox",
  HistoryPayBoxSchema,
  "payBoxHistory"
);
