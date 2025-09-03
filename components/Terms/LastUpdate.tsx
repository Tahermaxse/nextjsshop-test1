import React from "react";

const LastUpdate = () => {
  return (
    <div className="relative z-0 mx-auto max-w-[1240px] border-grid-border border-x  py-10">
      <p className="text-center text-sm text-neutral-500">
        {`Last updated: ${new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`}
      </p>
    </div>
  );
};

export default LastUpdate;
