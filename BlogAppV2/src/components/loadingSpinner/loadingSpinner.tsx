import * as React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import { createStyles } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = createStyles({
  //   cardTitle,
  textPosition: {
    textAlign: "center"
  },
  marginAutoContainer: {
    width: 500,
    height: 80,
    display: "flex",
    backgroundColor: "gold"
  },
  marginAutoItem: {
    margin: "auto"
  },
  alignItemsAndJustifyContent: {
    //width: 500,
    //height: 80,
    width: "50vw",
    height: "50vh",
    display: "grid",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "pink",
    margin: "auto",
    flexDirection: "column"
  },
  localcontainer: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center"
  },
  element: {
    position: "fixed",
    zIndex: 999,
    height: "2em",
    width: "2em",
    overflow: "visible",
    margin: "auto",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
const LoadinSpinner = (props: any) => {
  const { classes } = props;
  return (
    // <div className={classes.container}>
    //   <GridItem xs={12} sm={12} md={12}>
    //     <CircularProgress size="7rem" />
    //   </GridItem>
    // </div>
    <div className={classes.element}>
      <CircularProgress size="9rem" color="secondary" />
    </div>
  );
};
export default withStyles(styles)(LoadinSpinner);
