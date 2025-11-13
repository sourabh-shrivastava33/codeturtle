import React from "react";

const LoadingState = () => {
  return (
    <div className="h-72 flex items-center justify-center flex-col gap-2">
      <div className="w-10 h-10 rounded-full border-4 border-border border-t-transparent animate-spin"></div>
      <p className="text-lg font-lighter text-muted-foreground ">Loading....</p>
    </div>
  );
};

export default LoadingState;
