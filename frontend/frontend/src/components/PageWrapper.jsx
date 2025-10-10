
import React from "react";

export default function PageWrapper({ bgImage, overlayOpacity = 0.7, children }) {
  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
        }}
      ></div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col gap-2 w-full">
        {children}
      </div>
    </div>
  );
}
