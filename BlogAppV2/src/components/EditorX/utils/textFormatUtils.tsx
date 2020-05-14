import * as React from "react";
import { css } from "emotion";
import Quote from "../../Typography/Quote";

export const ElementX = (props: any) => {
  switch (props.element.type) {
    case "paragraph":
      return <p {...props}>{props.children}</p>;
    case "block-quote":
      return <QuoteCust {...props}> {props.children}</QuoteCust>;
    case "link":
      return (
        <a {...props.attributes} href={props.element.url}>
          {props.children}
        </a>
      );
    case "h1":
      return (
        <h1 {...props} style={{ fontFamily: "Assistant" }}>
          {props.children}
        </h1>
      );
    case "h2":
      return <h2 {...props}>{props.children}</h2>;
    case "h3":
      return <h3 {...props}>{props.children}</h3>;
    case "h4":
      return <h4 {...props}>{props.children}</h4>;
    case "h5":
      return <h5 {...props}>{props.children}</h5>;
    case "h6":
      return <h5 {...props}>{props.children}</h5>;
    default:
      return <DefaultELement {...props}>{props.children}</DefaultELement>;
  }
};
export const LeafX = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underlined) {
    children = <u>{children}</u>;
  }
  if (leaf.code) {
    children = <code>{children}</code>;
  }
  if (leaf.highlighted) {
    //TODO:make an element with style for mark
    children = <mark>{children}</mark>;
  }

  return <span {...attributes}>{children}</span>;
};
const DefaultELement = (props: any) => {
  return <div>{props.children}</div>;
};
const Q = (props: any) => {
  return <Quote {...props}>{props.children}</Quote>;
};
const QuoteCust = (props: any) => {
  return (
    <blockquote
      className={css`
        font-family: "Roboto", "Helvetica", "Arial", sans-serif, Assistant;
        font-weight: 300;
        line-height: 1.5em;
        direction: rtl;
        color: rgba(0, 0, 0, 0.87);
        white-space: pre-wrap;
        overflow-wrap: break-word;
        -webkit-tap-highlight-color: transparent;
        -webkit-font-smoothing: antialiased;
        padding: 10px 20px;
        margin: 0 0 20px;
        font-size: 17.5px;
        border-right: 5px solid #eee;
      `}
    >
      <p
        className={css`
          font-family: "Roboto", "Helvetica", "Arial", sans-serif, Assistant;
          font-weight: 300;
          line-height: 1.5em;
          direction: rtl;
          color: rgba(0, 0, 0, 0.87);
          white-space: pre-wrap;
          overflow-wrap: break-word;
          font-size: 17.5px;
          -webkit-tap-highlight-color: transparent;
          -webkit-font-smoothing: antialiased;
          margin: 0 0 10px;
          font-style: italic;
        `}
      >
        {props.children}
      </p>
    </blockquote>
  );
};
