import React from "react";

export default function Footer() {
  const date = new Date();
  return (
    <div
      className="bg-[rgb(3,3,26)] p-4 flex items-center justify-center
  "
    >
      <p className="text-sm italic text-gray-200">
        {" "}
        &copy; Copyright Samdigitalx {date.getFullYear()}
      </p>
    </div>
  );
}
