import * as React from "react";
import { Slate, Editable, withReact } from "slate-react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { HoveringToolbarX } from "./HoverMenu";
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle";
import {
  ElementX,
  LeafX,
  toggleFormat,
  toggleBlock,
  withLinks,
} from "./utils/textFormatUtils";
//TODO:this code needs to be split to smaller utils funcitons;
const styles = createStyles({
  ...rtlStyle,
});

const initialValue = [
  {
    children: [
      {
        text: "זוהי הכותרת הראשית של הפוסט שיפורסם",
      },
    ],
    type: "h1",
  },

  {
    children: [
      {
        text:
          "כאן נכתוב בכמה משפטים ממש קצרים את תוכן הפוסט ,ועל מה אנחנו נדבר",
      },
    ],
    type: "h6",
  },

  {
    children: [
      {
        text:
          "כאן יהיה התוכן המלא של הפוסט.אנחנו נוכל לכתוב פסקאות שלמות שמספר את הסיפור של מה שרצינו להעביר בעצם",
      },
    ],
    type: "paragraph",
  },
];
const EditorAxe = (props: any) => {
  const renderElmnt = ElementX;

  const editor = React.useMemo(
    () => withLinks(withHistory(withReact(createEditor()))),
    []
  );
  const [value, setValue] = React.useState<any>(
    initialValue || props.localValue
  );
  const [readOnly, setReadOnly] = React.useState(props.isReadOnly || false);
  React.useEffect(() => {
    if (props.localValue) {
      setValue(props.localValue);
    }
    return () => {};
  }, [props.localValue]);

  const renderElement = React.useCallback(renderElmnt, []);
  const renderLeaf = React.useCallback(LeafX, []);
  return (
    <>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          setValue(value);
          props.setPostTitle(value[0].children[0].text);
          const content = JSON.stringify(value);
          localStorage.setItem("content", content);
          props.editorContent(value);
        }}
      >
        <HoveringToolbarX
          toggleAction={toggleFormat}
          editor={editor}
          toggleBlockAction={toggleBlock}
        />
        {/* <HoveringToolbar /> */}
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder=""
          readOnly={readOnly}
          onDOMBeforeInput={(event: any) => beforeDomInput(event, editor)}
          onKeyDown={(data) => {
            if (data.key !== "Enter") {
              return;
            }
            if (data.key === "Enter" && data.shiftKey) {
              data.preventDefault();
              editor.insertText("\n");
            }
          }}
        />
      </Slate>
    </>
  );
};

const beforeDomInput = (event: any, editor: any) => {
  switch (event.inputType) {
    case "formatBold":
      return toggleFormat(editor, "bold");
    case "formatItalic":
      return toggleFormat(editor, "italic");
    case "formatUnderline":
      return toggleFormat(editor, "underline");
    case "formatQuote":
      return toggleFormat(editor, "block-quote");
  }
};
/*
// const toggleFormat = (editor: any, format: any) => {
//   const isActive = isFormatActive(editor, format);

//   Transforms.setNodes(
//     editor,
//     { [format]: isActive ? null : true },
//     { match: Text.isText, split: true }
//   );
// };

// const isFormatActive = (editor: any, format: any) => {
//   const [match] = Editor.nodes(editor, {
//     match: (n) => n[format] === true,
//     mode: "all",
//   });
//   return !!match;
// };

// const isMarkActive = (editor: any, format: any) => {
//   const marks = Editor.marks(editor);
//   return marks ? marks[format] === true : false;
// };

// const toggleMark = (editor: any, format: any) => {
//   const isActive = isMarkActive(editor, format);
//   if (isActive) {
//     Editor.removeMark(editor, format);
//   } else {
//     Editor.addMark(editor, format, true);
//   }
// };
//const LIST_TYPES = ["numbered-list", "bulleted-list"];

// const toggleBlock = (editor: any, format: any) => {
//   const isActive = isBlockActive(editor, format);
//   console.log(editor, isActive);
//   const isList = LIST_TYPES.includes(format);

//   Transforms.unwrapNodes(editor, {
//     match: (n) => LIST_TYPES.includes(n.type),
//     split: true,
//   });

//   Transforms.setNodes(editor, {
//     type: isActive ? "paragraph" : isList ? "list-item" : format,
//   });

//   if (!isActive && isList) {
//     const block = { type: format, children: [] };
//     Transforms.wrapNodes(editor, block);
//   }
// };

// const isBlockActive = (editor: any, format: any) => {
//   const [match] = Editor.nodes(editor, {
//     match: (n) => n.type === format,
//   });

//   return !!match;
// };

// const Element = ({ attributes, children, element }: any) => {
//   switch (element.type) {
//     case "bulleted-list":
//       return <ul {...attributes}>{children}</ul>;
//     case "heading-one":
//       return <h1 {...attributes}>{children}</h1>;
//     case "heading-two":
//       return <h2 {...attributes}>{children}</h2>;
//     case "list-item":
//       return <li {...attributes}>{children}</li>;
//     case "numbered-list":
//       return <ol {...attributes}>{children}</ol>;
//     default:
//       return <p {...attributes}>{children}</p>;
//   }
// };

// const HoveringToolbar = () => {
//   const ref = React.useRef<any>();
//   const editor = useSlate();

//   React.useEffect(() => {
//     const el = ref.current;
//     const { selection } = editor;

//     if (!el) {
//       return;
//     }

//     if (
//       !selection ||
//       !ReactEditor.isFocused(editor) ||
//       Range.isCollapsed(selection) ||
//       Editor.string(editor, selection) === ""
//     ) {
//       el.removeAttribute("style");
//       return;
//     }

//     const domSelection = window.getSelection();
//     if (domSelection) {
//       const domRange = domSelection.getRangeAt(0);
//       const rect = domRange.getBoundingClientRect();
//       el.style.opacity = 1;
//       el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
//       el.style.left = `${rect.left +
//         window.pageXOffset -
//         el.offsetWidth / 2 +
//         rect.width / 2}px`;
//     }
//   }, []);

//   return (
//     <Portal>
//       <Menu
//         ref={ref}
//         className={css`
//           padding: 8px 7px 6px;
//           position: absolute;
//           z-index: 1;
//           top: -10000px;
//           left: -10000px;
//           margin-top: -6px;
//           opacity: 0;
//           background-color: #222;
//           border-radius: 12px;
//           transition: opacity 0.75s;
//           font-family: Assistant;
//         `}
//       >
//         <FormatButton format="bold" icon="format_bold" />
//         <FormatButton format="italic" icon="format_italic" />
//         <FormatButton format="underlined" icon="format_underlined" />
//         <FormatButton format="block-quote" icon="format_quote" />
//         <BlockButton format="heading-one" icon="looks_one" />
//         <BlockButton format="heading-two" icon="looks_two" />
//         <BlockButton format="block-quote" icon="format_quote" />
//         <BlockButton format="numbered-list" icon="format_list_numbered" />
//         <BlockButton format="bulleted-list" icon="format_list_bulleted" />
//         <MarkButton format="highlighted" icon="code" />
//       </Menu>
//     </Portal>
//   );
// };
// const BlockButton = ({ format, icon }: any) => {
//   const editor = useSlate();
//   return (
//     <Button
//       active={isBlockActive(editor, format)}
//       onMouseDown={(event: any) => {
//         event.preventDefault();
//         toggleBlock(editor, format);
//       }}
//     >
//       <Icon>{icon}</Icon>
//     </Button>
//   );
// };
// const FormatButton = ({ format, icon }: any) => {
//   const editor = useSlate();
//   return (
//     <Button
//       reversed
//       active={isFormatActive(editor, format)}
//       onMouseDown={(event: any) => {
//         event.preventDefault();
//         console.log(event);
//         toggleFormat(editor, format);
//       }}
//     >
//       <Icon>{icon}</Icon>
//     </Button>
//   );
// };
// const MarkButton = ({ format, icon }: any) => {
//   const editor = useSlate();
//   return (
//     <Button
//       active={isMarkActive(editor, format)}
//       onMouseDown={(event: any) => {
//         event.preventDefault();
//         toggleMark(editor, format);
//       }}
//     >
//       <Icon>{icon}</Icon>
//     </Button>
//   );
// };

// const QuoteCust = (props: any) => {
//   return (
//     <blockquote
//       className={css`
//         font-family: "Roboto", "Helvetica", "Arial", sans-serif, Assistant;
//         font-weight: 300;
//         line-height: 1.5em;
//         direction: rtl;
//         color: rgba(0, 0, 0, 0.87);
//         white-space: pre-wrap;
//         overflow-wrap: break-word;
//         -webkit-tap-highlight-color: transparent;
//         -webkit-font-smoothing: antialiased;
//         padding: 10px 20px;
//         margin: 0 0 20px;
//         font-size: 17.5px;
//         border-right: 5px solid #eee;
//       `}
//     >
//       <p
//         className={css`
//           font-family: "Roboto", "Helvetica", "Arial", sans-serif, Assistant;
//           font-weight: 300;
//           line-height: 1.5em;
//           direction: rtl;
//           color: rgba(0, 0, 0, 0.87);
//           white-space: pre-wrap;
//           overflow-wrap: break-word;
//           font-size: 17.5px;
//           -webkit-tap-highlight-color: transparent;
//           -webkit-font-smoothing: antialiased;
//           margin: 0 0 10px;
//           font-style: italic;
//         `}
//       >
//         {props.children}
//       </p>
//     </blockquote>
//   );
// };

// const DefaultELement = (props: any) => {
//   return <div>{props.children}</div>;
// };
// const insertLink = (editor: any, url: any) => {
//   if (editor.selection) {
//     wrapLink(editor, url);
//   }
// };
// const Leaf = ({ attributes, children, leaf }: any) => {
//   if (leaf.bold) {
//     children = <strong>{children}</strong>;
//   }

//   if (leaf.italic) {
//     children = <em>{children}</em>;
//   }

//   if (leaf.underlined) {
//     children = <u>{children}</u>;
//   }
//   if (leaf.code) {
//     children = <code>{children}</code>;
//   }
//   if (leaf.highlighted) {
//     //TODO:make an element with style for mark
//     children = <mark>{children}</mark>;
//   }

//   return <span {...attributes}>{children}</span>;
// };

// const withLinks = (editor: any) => {
//   const { insertData, insertText, isInline } = editor;

//   editor.isInline = (element: any) => {
//     return element.type === "link" ? true : isInline(element);
//   };

//   editor.insertText = (text: any) => {
//     if (text && isUrl(text)) {
//       wrapLink(editor, text);
//     } else {
//       insertText(text);
//     }
//   };

//   editor.insertData = (data: any) => {
//     const text = data.getData("text/plain");

//     if (text && isUrl(text)) {
//       wrapLink(editor, text);
//     } else {
//       insertData(data);
//     }
//   };

//   return editor;
// };

// const isLinkActive = (editor: any) => {
//   const [link] = Editor.nodes(editor, { match: (n) => n.type === "link" });
//   return !!link;
// };

// const unwrapLink = (editor: any) => {
//   Transforms.unwrapNodes(editor, { match: (n) => n.type === "link" });
// };

// const wrapLink = (editor: any, url: any) => {
//   if (isLinkActive(editor)) {
//     unwrapLink(editor);
//   }

//   const { selection } = editor;
//   const isCollapsed = selection && Range.isCollapsed(selection);
//   const link = {
//     type: "link",
//     url,
//     children: isCollapsed ? [{ text: url }] : [],
//   };

//   if (isCollapsed) {
//     Transforms.insertNodes(editor, link);
//   } else {
//     Transforms.wrapNodes(editor, link, { split: true });
//     Transforms.collapse(editor, { edge: "end" });
//   }
// };*/
export default withStyles(styles)(EditorAxe);
