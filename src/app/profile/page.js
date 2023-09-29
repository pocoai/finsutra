import CreditHistory from "@/components/profile/CreditHistory";
import UserProfile from "@/components/profile/UserProfile";
import { getUserData } from "@/services/user";
import { auth } from "@clerk/nextjs";
import React from "react";

const page = async () => {
  const { getToken } = auth();

  let token = await getToken();

  let userData = await getUserData(token);

  // console.log(userData, "userData in pr");

  return (
    <div className="grid grid-cols-2 place-items-center place-content-center h-full">
      <UserProfile userData={userData} />
      <CreditHistory
        credits={userData?.credits}
        currentPlan={userData?.currentPlan}
        creditHistory={userData?.creditsHistory}
      />
    </div>
  );
};

export default page;
