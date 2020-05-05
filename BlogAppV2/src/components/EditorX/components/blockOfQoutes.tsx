import * as Immutable from "immutable";
import * as React from "react";
import typographyStyle from "../../../assets/jss/material-dashboard-react/components/typographyStyle";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
const styles = createStyles({
  ...typographyStyle,
});

export const QuoteBlock = (props: any) => {
  const { classes } = props;
  React.useEffect(() => {
    console.log("re render");
    return () => {};
  }, []);
  return (
    // <blockquote className={classes.defaultFontStyle + " " + classes.quote}>
    //   <p className={classes.quoteText}>"{props.blockProps.text}"</p>
    //   {/* <small className={classes.quoteAuthor}>gdsggsdffgdsfgdsgdsggdf</small> */}
    // </blockquote>
    <blockquote>
      <p>"QUOTE WUOTE "</p>
      {/* <small className={classes.quoteAuthor}>gdsggsdffgdsfgdsgdsggdf</small> */}
    </blockquote>
  );
};
//export default withStyles(styles)(QuoteBlock);
