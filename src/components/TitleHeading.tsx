import React from "react";

const TitleHeading = ({ version }: { version: string }) => {
  return (
    <h1 className="scilla-regular-italic text-8xl font-extrabold mb-6">
      NT<span className="scilla-regular smallen">de</span>S
      <span className="scilla-regular smallen">k</span>
      {"    "}
      <span className="scilla-regular smallen">
        {version} <span className="smallen">💖</span>
      </span>
    </h1>
  );
};

export default TitleHeading;
