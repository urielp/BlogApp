import * as React from "react";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import CodeIcon from "@material-ui/icons/Code";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

export const BlockStyleButton = (props: any) => {
  const onToggle = (e: any) => {
    e.preventDefault();
    props.onToggle(props.style);
    if (props.active) {
      setClassName("RichEditor-activeButton");
    }
  };

  const getIcon = (icon: string) => {
    switch (icon) {
      case "CodeIcon":
        return <CodeIcon />;
      case "FormatListNumberedIcon":
        return <FormatListNumberedIcon />;
      case "FormatQuoteIcon":
        return <FormatQuoteIcon />;
      case "FormatListBulletedIcon":
        return <FormatListBulletedIcon />;
    }
  };

  const [className, setClassName] = React.useState("RichEditor-stylebutton");
  return (
    <span className={className} onClick={onToggle}>
      {/* {props.label} */}
      {getIcon(props.icon)}
    </span>
  );
};
