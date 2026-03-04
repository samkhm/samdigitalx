import React from "react";
import { getFirstName } from "@/utils/auth";
export default function Home() {
  const fname = getFirstName();
  return (
    <div>
      <div className="flex items-center justify-center gap-5 border-b border-gray-200 p-3 sticky top-0 bg-white z-10">
        <h3 className="text-xl font-semibold">Welcome {fname}</h3>
      </div>

      <div className="flex flex-col items-center justify-center h-80">
        <p className="text-gray-500 italic">Navigate to sidebar and perform operations.</p>
        <span className="text-blue-500 italic">Thank you😊</span>
      </div>
    </div>
  );
}
