import React from "react";

const Notifications = () => {
  return (
    <div className="border rounded-md p-6 ">
      <h1 className="font-bold">Notifications</h1>
      <div className="mb-2 flex flex-col gap-3 h-[15vh] overflow-y-scroll">
        {new Array(7).fill(0).map((_, i) => (
          <div key={i} className="border-b pb-2">
            <h1 className="font-semibold">Income report for June</h1>
            Lorem ipsum, dolor sit amet consectetur adipisicing.
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
