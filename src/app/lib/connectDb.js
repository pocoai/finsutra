import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    mongoose
      .connect(process.env.DATABASE_URL)
      .then((res) => {
        console.log("db connected");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};
