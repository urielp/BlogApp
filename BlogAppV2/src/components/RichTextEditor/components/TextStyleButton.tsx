import * as React from "react";
import InsertLinkIcon from "@material-ui/icons/InsertLink";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import HighlightIcon from "@material-ui/icons/Highlight";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import Button from "../../CustomButtons/Button";
import TitleIcon from "@material-ui/icons/Title";
import { RichUtils, AtomicBlockUtils } from "draft-js";
export const TextStyleButton = (props: any) => {
  const onToggle = (e: any) => {
    e.preventDefault();
    console.log(props);
    props.onChange(
      RichUtils.toggleInlineStyle(props.editorState, props.type.style)
    );
  };

  const getIcon = (icon: string) => {
    switch (icon) {
      case "InsertLink":
        return <InsertLinkIcon />;
      case "FormatUnderlined":
        return <FormatUnderlinedIcon />;
      case "Highlight":
        return <HighlightIcon />;
      case "FormatBold":
        return <FormatBoldIcon />;
      case "FormatItalic":
        return <FormatItalicIcon />;
    }
  };

  return (
    <Button
      color="info"
      aria-label="edit"
      justIcon={true}
      round={true}
      onClick={onToggle}
    >
      {getIcon(props.icon)}
    </Button>
  );
};
