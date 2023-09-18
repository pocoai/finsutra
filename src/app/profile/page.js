import CreditHistory from "@/components/profile/CreditHistory";
import UserProfile from "@/components/profile/UserProfile";
import React from "react";

const page = () => {
  return (
    <div className="grid grid-cols-2 place-items-center place-content-center h-full">
      <UserProfile />
      <CreditHistory />
    </div>
  );
};

export default page;
