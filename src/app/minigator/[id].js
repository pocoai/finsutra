import React from "react";

import UploadAndChat from "@/components/minigator/UploadAndChat";

const App = ({ id }) => {
  return <UploadAndChat id={id}/>;
};

export default App;

//  get id using server side rendering

export async function getServerSideProps(context) {
  const id = context.query.id;
  return {
    props: {
      id,
    },
  };
}