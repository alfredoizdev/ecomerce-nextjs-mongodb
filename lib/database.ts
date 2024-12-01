import mongoose from "mongoose";

const connectToMongoDB = async () => {
  // Check if we have a connection to the database or if it's currently connected
  if (mongoose.connections[0].readyState) {
    // Use current connection if it exists
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("Please add your Mongo URI to .env.local");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    if (err) {
      console.error(err);
    }
  }
};

export default connectToMongoDB;
