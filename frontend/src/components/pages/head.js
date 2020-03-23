import React from "react";
import head from "./metadata.json";
const getMeta = page => {
  if (page && page.meta)
    return page.meta.map((value, index) => <meta key={index} {...value} />);
  return "";
};
export { getMeta, head };
