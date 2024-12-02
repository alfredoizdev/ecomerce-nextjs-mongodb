import mongoose from "mongoose";

const connectToMongoDB = async () => {
  const uriConnection =
    process.env.NODE_ENV === "production"
      ? process.env.MONGO_URI_ATLAS
      : process.env.MONGO_URI_LOCAL;

  // Check if we have a connection to the database or if it's currently connected
  if (mongoose.connections[0].readyState) {
    // Use current connection if it exists
    return;
  }

  if (!uriConnection) {
    throw new Error("Please add your Mongo URI to .env.local");
  }

  try {
    await mongoose.connect(uriConnection);
  } catch (err) {
    if (err) {
      console.error(err);
    }
  }
};

export default connectToMongoDB;
