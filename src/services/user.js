import { auth } from "@clerk/nextjs";
import axios from "axios";

const api = process.env.NEXT_PUBLIC_URL;

export function getUserData() {
  return new Promise(async (resolve, reject) => {
    try {
      const { getToken } = auth();

      const token = await getToken();

      let response = await axios.get(`${api}/api/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        resolve(response.data.data);
      } else {
        reject(new Error("Request was not successful"));
      }
    } catch (error) {
      reject(error);
    }
  });
}
