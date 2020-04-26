import * as Immutable from "immutable";
import * as React from "react";
import typographyStyle from "../../../assets/jss/material-dashboard-react/components/typographyStyle";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
const styles = createStyles({
  ...typographyStyle,
});

const QuoteBlock = (props: any) => {
  const { classes } = props;
  console.log(props);
  return (
    <blockquote className={classes.defaultFontStyle + " " + classes.quote}>
      <p className={classes.quoteText}>"{props.blockProps.text}"</p>
      {/* <small className={classes.quoteAuthor}>gdsggsdffgdsfgdsgdsggdf</small> */}
    </blockquote>
  );
};
export default withStyles(styles)(QuoteBlock);
