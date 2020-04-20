import * as React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import avatar from "../../assets/img/faces/marc.jpg";
import { createStyles } from "@material-ui/core";
import PostsList from "../../components/posts/postsList/postsList";
import imagesStyles from "../../assets/jss/material-dashboard-react/imageStyles";
import { cardTitle } from "../../assets/jss/material-dashboard-react";
import { useStoreAsyncVersion } from "../../stores/store";
import CircularProgress from "@material-ui/core/CircularProgress";
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner";
import axios from "axios";
import moment from "moment";
const styles = createStyles({
  ...imagesStyles,
  //   cardTitle,
  textMuted: {
    color: "#6c757d"
  }
});

const PostsPage = (props: any) => {
  const { classes } = props;
  const [StateAsync, DispatchAsync] = useStoreAsyncVersion(true);
  const [posts, setPosts] = React.useState(StateAsync.posts);
  const [loading, isLoading] = React.useState(false);
  React.useEffect(() => {
    isLoading(true);
    const getPosts = async () => {
      const results = await axios.get("http://localhost:3000/articles", {});
      //setPosts(results.data.articles);
      //TODO:need to make this in global store and state
      DispatchAsync("GET_POSTS", {}).then(() => {
        setTimeout(() => {
          isLoading(false);
        }, 3000);
      });
      //setPosts(StateAsync.posts);
    };
    getPosts();

    return () => {};
  }, []);
  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className={classes.container}>
          <GridContainer justify="center">
            <PostsList posts={posts} load={loading} />
          </GridContainer>
        </div>
      )}
    </div>
  );
  // return loading ? <CircularProgress /> : <PostsList posts={posts} />;
};
export default withStyles(styles)(PostsPage);
