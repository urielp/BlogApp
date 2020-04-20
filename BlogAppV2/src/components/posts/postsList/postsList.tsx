import * as React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import GridContainer from "../../Grid/GridContainer";
import GridItem from "../../Grid/GridItem";
import PostItem from "../postItem/postItem";
import { useStoreAsyncVersion } from "../../../stores/store";
import rtlStyle from "../../../assets/jss/material-dashboard-react/views/rtlStyle";
import { container } from "../../../assets/jss/material-dashboard-react";
import classes from "*.module.css";
"reactstrap";

export interface postProps {
  posts: any[];
}
const styles = createStyles({
  ...rtlStyle,
  container: {
    ...container,
    zIndex: 2,
    position: "relative",
    paddingTop: "20vh",
    color: "#FFFFFF",
    paddingBottom: "200px"
  }
});
const PostsList = (props: any) => {
  const StateAsync = useStoreAsyncVersion(true)[0];
  const { classes } = props;
  console.log(classes.container);
  React.useEffect(() => {
    console.log(props.load);
  }, []);
  return (
    <div>
      {/* <GridContainer justify="center"> */}
      {StateAsync.posts.map((v: any, key: any) => {
        return (
          <GridItem xs={12} sm={12} md={12} key={key}>
            <PostItem post={v} key={key} />
          </GridItem>
        );
      })}
      {/* </GridContainer> */}
    </div>
  );
};
export default withStyles(styles)(PostsList);
