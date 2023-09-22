import CreditHistory from "@/components/profile/CreditHistory";
import UserProfile from "@/components/profile/UserProfile";
import { getUserData } from "@/services/user";
import React from "react";

const page = async () => {
  let userData = await getUserData();
  return (
    <div className="grid grid-cols-2 place-items-center place-content-center h-full">
      <UserProfile userData={userData} />
      <CreditHistory
        credits={userData?.credits}
        currentPlan={userData?.currentPlan}
        creditHistory={userData?.creditHistory}
      />
    </div>
  );
};

export default page;
