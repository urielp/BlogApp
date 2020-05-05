import * as React from "react";
import { Slate, Editable, ReactEditor, withReact, useSlate } from "slate-react";
import { Range } from "slate";
import { Editor, Transforms, Text, createEditor } from "slate";
import { Icon, Menu, Portal } from "./components";
import LinkButton from "./components/LinkButton";
import FormatButtonX from "./FormatButtonX";
import StyleButton from "./StyleButton";
import { cx, css } from "emotion";
import CodeIcon from "@material-ui/icons/Code";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";

const STYLE_TYPES = [
  { format: "bold", iconFormat: "formatBold" },
  { format: "underlined", iconFormat: "formatUnderline" },
  { format: "italic", iconFormat: "formatItalic" },
  { format: "highlighted", iconFormat: "formatHighlight" },
  { format: "code", iconFormat: "formatCode" },
];
const BLOCK_STYLE = [
  { format: "block-quote", iconFormat: "formatQuote" },
  { format: "h1", content: "H1" },
  { format: "h2", content: "H2" },
  { format: "h3", content: "H3" },
  { format: "h4", content: "H4" },
  { format: "h5", content: "H5" },
  { format: "h6", content: "H6" },
  //   { format: "numbred-list", iconFormat: "formatUnderline" },
  //   { format: "bulleted-list", iconFormat: "formatItalic" },
];
export const HoveringToolbarX = (props: any) => {
  const ref = React.useRef<any>();
  const editor = useSlate();

  React.useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();
    if (domSelection) {
      const domRange = domSelection.getRangeAt(0);
      const rect = domRange.getBoundingClientRect();
      el.style.opacity = 1;
      el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
      el.style.left = `${rect.left +
        window.pageXOffset -
        el.offsetWidth / 2 +
        rect.width / 2}px`;
    }
  });

  return (
    <Portal>
      <Menu
        ref={ref}
        className={css`
          padding: 8px 7px 6px;
          position: absolute;
          z-index: 1;
          top: -10000px;
          left: -10000px;
          margin-top: -6px;
          opacity: 0;
          background-color: #222;
          border-radius: 4px;
          transition: opacity 0.75s;
        `}
      >
        {STYLE_TYPES.map((type, key) => {
          return (
            <StyleButton
              format={type.format}
              iconFormat={type.iconFormat}
              toggleStyleAction={props.toggleAction}
              key={key}
            />
          );
        })}

        {/* <FormatButtonX
          iconFormat="formatQuote"
          toggleBlockAction={props.toggleBlockAction}
        /> */}
        {BLOCK_STYLE.map((type, key) => {
          return (
            <FormatButtonX
              key={key}
              format={type.format}
              iconFormat={type.iconFormat}
              content={type.content}
              toggleBlockAction={props.toggleBlockAction}
            />
          );
        })}
        <LinkButton />
      </Menu>
    </Portal>
  );
};
