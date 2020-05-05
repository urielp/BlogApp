import * as React from "react";
import Quote from "../../Typography/Quote";

export const Element = (props: any) => {
  switch (props.element.type) {
    case "block-quote":
      console.log("Quotes");
      return <Quote {...props}>{props.children}</Quote>;
    case "bulleted-list":
      return <ul {...props}>{props.children}</ul>;
    case "heading-one":
      return <h1 {...props}>{props.children}</h1>;
    case "heading-two":
      return <h2 {...props}>{props.children}</h2>;
    case "list-item":
      return <li {...props}>{props.children}</li>;
    case "numbered-list":
      return <ol {...props}>{props.children}</ol>;
    default:
      return <p {...props}>{props.children}</p>;
  }
};

export const Q = (props: any) => {
  return <Quote {...props}>{props.children}</Quote>;
};
