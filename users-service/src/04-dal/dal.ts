import mongoose from "mongoose";
async function connect(): Promise<void> {
  try {
    const db = await mongoose.connect("mongodb://127.0.0.1:27017/payBox");
    console.log("We're connected to MongoDB " + db.connections[0].name);
  } catch (err: any) {
    console.log(err);
  }
}
export default { connect };
