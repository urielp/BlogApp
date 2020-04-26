import * as React from "react";
import { EditorState, Editor, RichUtils, AtomicBlockUtils } from "draft-js";
import { BlockStyleButton } from "./BlockStyleButton";
import { HeaderStyleDropdown } from "./HeaderStyleDD";

export const BLOCK_TYPES = [
  { label: " “ ” ", style: "blockquote", icon: "FormatQuoteIcon" },
  { label: "UL", style: "unordered-list-item", icon: "FormatListBulletedIcon" },
  { label: "OL", style: "ordered-list-item", icon: "FormatListNumberedIcon" },
  { label: "{ }", style: "code-block", icon: "CodeIcon" },
];
export const HEADER_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
];

export function getBlockStyle(block: any) {
  switch (block.type) {
    // case "blockquote":
    //   console.log(block);
    //   return "RichEditor-blockquote";
    default:
      return "";
  }
}

export const BLockStyleToolBar = (props: any) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <span className="RichEditor-controls">
      <HeaderStyleDropdown
        headerOptions={HEADER_TYPES}
        active={blockType}
        onToggle={props.onToggle}
      />

      {BLOCK_TYPES.map((type) => {
        return (
          <BlockStyleButton
            active={type.style === blockType}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
            key={type.label}
            type={type}
            icon={type.icon}
          />
        );
      })}
    </span>
  );
};
