import * as React from "react";
import { Slate, Editable, ReactEditor, withReact, useSlate } from "slate-react";
import { Editor, Transforms, Text, createEditor } from "slate";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import CodeIcon from "@material-ui/icons/Code";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import InsertLinkIcon from "@material-ui/icons/InsertLink";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import HighlightIcon from "@material-ui/icons/Highlight";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import { createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import Button from "../CustomButtons/Button";
import editorButtonStyle from "../../assets/jss/material-dashboard-react/components/editorButtonStyle";

const buttonStyles = createStyles({
  ...editorButtonStyle,
});
const FormatButtonX = ({
  format,
  iconFormat,
  content,
  toggleAction,
  toggleBlockAction,
}: any) => {
  const editor = useSlate();

  const [textFormat, setTextFormat] = React.useState("unstyled");
  const isFormatActive = (editor: any, format: any) => {
    const [match] = Editor.nodes(editor, {
      match: (n) => n[format] === true,
      mode: "all",
    });
    return !!match;
  };
  const getIcon = (icon: string) => {
    switch (icon) {
      case "formatLink":
        return <InsertLinkIcon />;
      case "formatUnderline":
        return <FormatUnderlinedIcon />;
      case "formatHighlight":
        return <HighlightIcon />;
      case "formatBold":
        return <FormatBoldIcon />;
      case "formatItalic":
        return <FormatItalicIcon />;
      case "formatCode":
        return <CodeIcon />;
      case "formatListNumbred":
        return <FormatListNumberedIcon />;
      case "formatQuote":
        return <FormatQuoteIcon />;
      case "formatListBulleted":
        return <FormatListBulletedIcon />;
      case "formatAlignCenter":
        return <FormatAlignCenterIcon />;
    }
  };

  const toggleFormatAction = () => {
    console.log("formatToggleBtn", format);
    toggleBlockAction(editor, format);
  };
  return (
    <Button
      reversed
      //active={isFormatActive(editor, format)}
      round={true}
      justIcon={true}
      color="primary"
      onMouseDown={(event: any) => {
        event.preventDefault();
        toggleFormatAction();
      }}
    >
      {iconFormat ? getIcon(iconFormat) : content}
    </Button>
  );
};
export default withStyles(buttonStyles)(FormatButtonX);
