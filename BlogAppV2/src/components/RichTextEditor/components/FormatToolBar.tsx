import * as React from "react";
import { createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import rtlStyle from "../../../assets/jss/material-dashboard-react/layouts/rtlStyle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import "./styles.css";

const FormatToolBar = (props: any) => {
  const { classes } = props;
  console.log(props.children);
  return (
    <div className={classes.root}>
      <Fab
        color="primary"
        aria-label="add"
        onClick={props.children.blockRendererFn}
      >
        <AddIcon />
      </Fab>
      <Fab color="secondary" aria-label="edit">
        <EditIcon />
      </Fab>
      {props.children}
    </div>
  );
};
export default withStyles(rtlStyle)(FormatToolBar);
