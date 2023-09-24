import axios from "axios";

const api = process.env.NEXT_PUBLIC_URL;

export function getUserData(token) {
  return new Promise(async (resolve, reject) => {
    try {
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

export const getCreditBalance = async (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(`${api}/api/getcreditbalance`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        resolve(response.data.data);
      }
    } catch (error) {
      reject(error);
    }
  });
};
