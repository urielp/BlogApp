import * as React from "react";
import { Slate, Editable, ReactEditor, withReact, useSlate } from "slate-react";
import { Editor, Transforms, Text, createEditor } from "slate";
import Button from "../../CustomButtons/Button";
import editorButtonStyle from "../../../assets/jss/material-dashboard-react/components/editorButtonStyle";
import LinkIcon from "@material-ui/icons/Link";
import isUrl from "is-url";
import { Range } from "slate";
import { createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
const buttonStyles = createStyles({
  ...editorButtonStyle,
});
const withLinks = (editor: any) => {
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
const insertLink = (editor: any, url: any) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

const isLinkActive = (editor: any) => {
  const [link] = Editor.nodes(editor, { match: (n) => n.type === "link" });
  return !!link;
};

const unwrapLink = (editor: any) => {
  Transforms.unwrapNodes(editor, { match: (n) => n.type === "link" });
};

const wrapLink = (editor: any, url: any) => {
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
const LinkButton = (props: any) => {
  const editor = useSlate();
  return (
    <Button
      reversed
      round={true}
      justIcon={true}
      color="primary"
      onMouseDown={(event: any) => {
        console.log("clicked from button component");
        event.preventDefault();
        const url = window.prompt("Enter the URL of the link:");
        if (!url) return;
        insertLink(editor, url);
      }}
    >
      <LinkIcon />
    </Button>
  );
};
export default withStyles(buttonStyles)(LinkButton);
