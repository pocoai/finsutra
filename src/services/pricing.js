import axios from "axios";

export function getPricing(token) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(`/api/getpricing`, {
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
