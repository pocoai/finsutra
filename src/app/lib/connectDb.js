import mongoose from "mongoose";

let cachedConnection;

export const connectDb = async () => {
  const env = process.env.NODE_ENV;

  if (cachedConnection) {
    console.log(`Using existing DB connection to ${env}`);
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(`${process.env.DATABASE_URL}/${env}`);
    console.log(`DB connected to ${env}`);
    cachedConnection = connection;
    return connection;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
