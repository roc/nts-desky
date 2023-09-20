import React from "react";

const FixedWidthContainer = ({
  children,
  containerWidth,
  className,
}: {
  children: React.ReactNode;
  containerWidth: string;
  className: string;
}) => {
  return (
    <div
      className={className}
      style={{ width: containerWidth, margin: "0 auto" }}
    >
      {children}
    </div>
  );
};

export default FixedWidthContainer;
