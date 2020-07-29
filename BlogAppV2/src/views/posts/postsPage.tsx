import * as React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "../../components/Grid/GridContainer";
import { createStyles } from "@material-ui/core";
import PostsList from "../../components/posts/postsList/postsList";
import imagesStyles from "../../assets/jss/material-dashboard-react/imageStyles";
import { useStoreAsyncVersion } from "../../stores/store";
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner";
import axios from "axios";
const styles = createStyles({
  ...imagesStyles,
  //   cardTitle,
  textMuted: {
    color: "#6c757d",
  },
});

const PostsPage = (props: any) => {
  const { classes } = props;
  //const [StateAsync, DispatchAsync] = useStoreAsyncVersion(true);
  //const [posts, setPosts] = React.useState(StateAsync.posts);
  const [loading, isLoading] = React.useState(false);

  // React.useEffect(() => {
  //   isLoading(true);
  //   const getPosts = async () => {
  //     //const results = await axios.get("http://localhost:3000/articles", {});
  //     //setPosts(results.data.articles);
  //     //TODO:need to make this in global store and state
  //     DispatchAsync("GET_POSTS", {}).then(() => {
  //       setTimeout(() => {
  //         isLoading(false);
  //       }, 3000);
  //     });
  //   };
  //   //  getPosts();
  //   isLoading(false);

  //   return () => {};
  // }, []);
  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className={classes.container}>
          <GridContainer justify="center">
            <PostsList load={loading} />
          </GridContainer>
        </div>
      )}
    </div>
  );
};
export default withStyles(styles)(PostsPage);
