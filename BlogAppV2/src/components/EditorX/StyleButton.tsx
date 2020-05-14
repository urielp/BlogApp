import * as React from "react";
import { Slate, Editable, ReactEditor, withReact, useSlate } from "slate-react";
import { Editor, Transforms, Text, createEditor } from "slate";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import HighlightIcon from "@material-ui/icons/Highlight";
import CodeIcon from "@material-ui/icons/Code";
import LinkIcon from "@material-ui/icons/Link";
import TitleIcon from "@material-ui/icons/Title";
import { createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import Button from "../CustomButtons/Button";
import editorButtonStyle from "../../assets/jss/material-dashboard-react/components/editorButtonStyle";

const buttonStyles = createStyles({
  ...editorButtonStyle,
});

const StyleButton = ({
  format,
  iconFormat,
  content,
  toggleStyleAction,
  toggleBlockAction,
}: any) => {
  const editor = useSlate();
  const [textStyle, setTextStyle] = React.useState("unstyled");
  const getIcon = (icon: string) => {
    switch (icon) {
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
      case "formatLink":
        return <LinkIcon />;
      case "formatTitle":
        return <TitleIcon />;
    }
  };
  const setStyle = () => {
    toggleStyleAction(editor, format);
  };
  return (
    <Button
      reversed
      //active={isFormatActive(editor, format)}
      round={true}
      justIcon={true}
      color="info"
      onMouseDown={(event: any) => {
        event.preventDefault();
        console.log(format);
        setStyle();
      }}
    >
      {iconFormat ? getIcon(iconFormat) : content}
    </Button>
  );
};
export default withStyles(buttonStyles)(StyleButton);
