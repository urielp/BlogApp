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
import { PostsList } from "../../components/posts/postsList/postsList";
import imagesStyles from "../../assets/jss/material-dashboard-react/imageStyles";
import { cardTitle } from "../../assets/jss/material-dashboard-react";
import { useStoreAsyncVersion } from "../../stores/store";
import axios from "axios";
const styles = createStyles({
  ...imagesStyles,
  //   cardTitle,
  textMuted: {
    color: "#6c757d"
  }
});

export const PostsPage = (props: any) => {
  const { classes } = props;
  const [posts, setPosts] = React.useState([]);
  const [StateAsync, DispatchAsync] = useStoreAsyncVersion(true);

  React.useEffect(() => {
    const getPosts = async () => {
      const results = await axios.get("http://localhost:3000/articles", {});
      setPosts(results.data.articles);
    };
    getPosts();
    return () => {};
  }, []);
  return (
    <div>
      <PostsList posts={posts} />
    </div>
  );
};
