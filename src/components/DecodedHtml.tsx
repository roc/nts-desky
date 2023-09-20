import { decode } from "html-entities";
import { Children } from "react";

const DecodedHtml = ({ children }: { children: React.ReactNode }) => {
  const childrenArray = Children.toArray(children);
  return (
    <>
      {childrenArray.map((child: string | JSX.Element) =>
        typeof child === "string" ? decode(child) : child
      )}
    </>
  );
};

export default DecodedHtml;
