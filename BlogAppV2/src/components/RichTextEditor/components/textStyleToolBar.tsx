import * as React from "react";
import { EditorState, Editor, RichUtils, AtomicBlockUtils } from "draft-js";
import { TextStyleButton } from "./TextStyleButton";
export const BLOCK_TYPES = [
  { style: "link", icon: "InsertLink" },
  { style: "UNDERLINE", icon: "FormatUnderlined" },
  { style: "HIGHLIGHT", icon: "Highlight" },
  { style: "BOLD", icon: "FormatBold" },
  { style: "ITALIC", icon: "FormatItalic" },
];

export const TextStyleToolBar = (props: any) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <span>
      {BLOCK_TYPES.map((type, key) => {
        return (
          <TextStyleButton
            active={type.style === blockType}
            onToggle={props.onToggle}
            style={type.style}
            key={key}
            type={type}
            icon={type.icon}
            editorState={editorState}
            onChange={props.onChange}
          />
        );
      })}
    </span>
  );
};
