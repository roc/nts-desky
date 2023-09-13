import { decode } from "html-entities";
import { Children } from "react";

const DecodedHtml = ({ children }: { children: any }) => {
  return (
    <>
      {Children.map(children, (child) =>
        typeof child === "string" ? decode(child) : child
      )}
    </>
  );
};

export default DecodedHtml;
