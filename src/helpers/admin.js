import axios from "axios";

let api = process.env.NEXT_PUBLIC_URL;

export const fetchMetrics = () => {
  return new Promise(async (resolve, reject) => {
    let res = await axios.get(`${api}/api/admin/getStatistics`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data.success) {
      resolve(res.data.data);
    } else {
      reject(new Error("Internal Server Error"));
    }
  });
};

export const fetchUsers = (page) => {
  return new Promise(async (resolve, reject) => {
    let res = await axios.get(`${api}/api/admin/getAllUsers?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data.success) {
      resolve(res.data.data);
    } else {
      reject(new Error("Internal Server Error"));
    }
  });
};

export const getProjects = async (id) => {
  return new Promise(async (resolve, reject) => {
    let res = await axios.post(
      `${api}/api/admin/projects`,
      {
        userId: id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data.success) {
      resolve(res.data.data);
    } else {
      reject(new Error("Internal Server Error"));
    }
  });
};
