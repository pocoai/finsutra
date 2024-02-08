"use client";

import React, { useState } from "react";
import ProjectList from "./ProjectList";
import Chat from "./Chat";

function SelectAndChat() {
  const [index, setIndex] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="flex items-start max-h-full h-full justify-start w-full overflow-hidden">
      <ProjectList
        index={index}
        setIndex={setIndex}
        setLoading={setLoading}
        setError={setError}
      />
      <Chat loading={loading} index={index} setIndex={setIndex} />
    </div>
  );
}

export default SelectAndChat;
