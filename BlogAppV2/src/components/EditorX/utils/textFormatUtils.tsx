import * as React from "react";
import { css } from "emotion";
import Quote from "../../Typography/Quote";
import { Editor, Transforms, Text, createEditor, Range } from "slate";
import isUrl from "is-url";
export const ElementX = (props: any) => {
  switch (props.element.type) {
    case "paragraph":
      return <p {...props}>{props.children}</p>;
    case "block-quote":
      console.log("q");
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
      return <h6 {...props}>{props.children}</h6>;
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

export const toggleFormat = (editor: any, format: any) => {
  const isActive = isFormatActive(editor, format);

  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  );
};
const isFormatActive = (editor: any, format: any) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n[format] === true,
    mode: "all",
  });
  return !!match;
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

export const toggleBlock = (editor: any, format: any) => {
  const isActive = isBlockActive(editor, format);
  console.log(editor, isActive);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const isBlockActive = (editor: any, format: any) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });

  return !!match;
};

export const withLinks = (editor: any) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element: any) => {
    return element.type === "link" ? true : isInline(element);
  };

  editor.insertText = (text: any) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data: any) => {
    const text = data.getData("text/plain");

    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const isLinkActive = (editor: any) => {
  const [link] = Editor.nodes(editor, { match: (n) => n.type === "link" });
  return !!link;
};

const unwrapLink = (editor: any) => {
  Transforms.unwrapNodes(editor, { match: (n) => n.type === "link" });
};

export const wrapLink = (editor: any, url: any) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};
