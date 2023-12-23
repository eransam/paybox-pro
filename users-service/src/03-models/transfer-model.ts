import { Document, model, Schema } from "mongoose";
export interface ItransferModel extends Document {
  userIdExport: number;
  userIdImport: number;
  moneyToTransfer: number;
}
const TransferModelSchema = new Schema<ItransferModel>(
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
  },

  {
    versionKey: false,
  }
);

export const TransferModel = model<ItransferModel>(
  "TransferModel",
  TransferModelSchema,
  "payBoxHistory"
);
