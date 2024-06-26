import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
// import PropTypes from "prop-types";

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import editorButtonStyle from "../../assets/jss/material-dashboard-react/components/buttonStyle";
import { createStyles } from "@material-ui/core";

function EditorButton({ ...props }: any) {
  const {
    classes,
    color,
    round,
    children,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    muiClasses,
    ...rest
  } = props;
  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    // [classes.round]: round,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className]: className,
  });
  return (
    <Fab {...rest} classes={muiClasses} className={btnClasses}>
      {children}
    </Fab>
  );
}

// RegularButton.propTypes = {
//   classes: PropTypes.object.isRequired,
//   color: PropTypes.oneOf([
//     "primary",
//     "info",
//     "success",
//     "warning",
//     "danger",
//     "rose",
//     "white",
//     "transparent"
//   ]),
//   size: PropTypes.oneOf(["sm", "lg"]),
//   simple: PropTypes.bool,
//   round: PropTypes.bool,
//   disabled: PropTypes.bool,
//   block: PropTypes.bool,
//   link: PropTypes.bool,
//   justIcon: PropTypes.bool,
//   className: PropTypes.string,
//   // use this to pass the classes props from Material-UI
//   muiClasses: PropTypes.object
// };

export default withStyles(editorButtonStyle)(EditorButton);
