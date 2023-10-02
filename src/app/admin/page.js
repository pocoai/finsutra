"use client";
import ViewModal from "@/components/admin/ViewModal";
import { fetchMetrics, fetchUsers } from "@/helpers/admin";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [isAdmin, setisAdmin] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState({});

  const init = async () => {
    setisLoading(true);
    let data = await fetchMetrics();
    setMetrics(data);
    let userData = await fetchUsers(page);
    setUsers(userData);
    setisLoading(false);
  };

  // const LoadMore = async () => {
  //   setPage(page + 1);
  //   let userData = await fetchUsers(page);
  //   setUsers([...users, ...userData]);
  // };

  const router = useRouter();

  const adminLogin = () => {
    if (localStorage.getItem("isAdmin")) {
      setisAdmin(true);
      init();
      return;
    }
    let password = prompt("Enter the passowrd");
    if (!password || password.toString() !== "favcy@favcy") {
      alert("Wrong password");
      return router.push("/");
    }
    setisAdmin(true);
    localStorage.setItem("isAdmin", true);
    init();
  };

  useEffect(() => {
    typeof window !== undefined && adminLogin();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="loading loading-spinner text-warning"></span>
      </div>
    );
  }

  console.log(users);

  return (
    isAdmin && (
      <div className="relative overflow-x-auto shadow-md bg-gray-200  dark:bg-gray-800">
        <div className="p-3">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              Total Users: {metrics?.totalUsers}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              Total Projects: {metrics.totalProjects}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              New Users: {metrics.newUsers}
            </p>
          </div>
        </div>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Images
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Credits
              </th>
              <th scope="col" className="px-6 py-3">
                Current Plan
              </th>{" "}
              <th scope="col" className="px-6 py-3">
                Organisation
              </th>
              <th scope="col" className="px-6 py-3">
                Total Projects
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {users.map((item, i) => (
              <tr
                key={item.userId}
                className={classNames(
                  "cursor-pointer border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600",
                  {
                    "bg-white dark:bg-gray-900": i % 2 === 0,
                    "bg-gray-50 dark:bg-gray-800": i % 2 !== 0,
                  }
                )}
                onClick={() => setSelectedUser(item)}
              >
                <td className="px-6 py-4">
                  <img className="w-10 h-10 rounded-full" src={item?.image} alt={item.firstName} />
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.firstName}
                </th>
                <td className="px-6 py-4">{item?.email}</td>
                {/* <td className="px-6 py-4">{item.isOnboarding ? "Yes" : "No"}</td> */}
                <td className="px-6 py-4">{item?.credits}</td>
                <td className="px-6 py-4">{item?.currentPlan}</td>
                <td className="px-6 py-4">{item?.org}</td>
                <td className="px-6 py-4">{item?.totalProjects}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="w-full flex items-center justify-center">
          <p className="text-center p-4 text-white" onClick={LoadMore}>
            Load More
          </p>
        </div> */}
        {selectedUser.userId && (
          <ViewModal selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        )}
      </div>
    )
  );
};

export default page;
