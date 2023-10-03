import React from "react";

import UploadAndChat from "@/components/UploadAndChat";

const Page = ({ id }) => {
  return <UploadAndChat id={id} />;
};

export default Page;

//  get id using server side rendering

export async function getServerSideProps(context) {
  const id = context.query.id;
  return {
    props: {
      id,
    },
  };
}
