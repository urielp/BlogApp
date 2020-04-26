import * as React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import { createStyles } from "@material-ui/core";
import { useStoreAsyncVersion } from "../../stores/store";
import axios from "axios";
import PostViewItem from "../../components/posts/singlePostViewItem/postViewItem";
const styles = createStyles({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: 300,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
});
const SinglePostView = (props: any) => {
  const { classes } = props;
  const [post, setPost] = React.useState({});
  const DispatchAsync = useStoreAsyncVersion(true)[1];
  React.useEffect(() => {
    // const getPost = async () => {
    //   let post = await DispatchAsync("GET_POST", "5e9e9b57a7a56c1621a53b9d");
    //   console.log(post);
    //   setPost(post);
    // };
    // getPost();
    console.log(props.location.state.postID);
    const getPost = async () => {
      const results = await axios.get(
        `http://localhost:3000/articles/${props.location.state.postID}`
      );
      setPost(results.data.article);
    };
    getPost();
  }, []);
  return (
    <>
      <PostViewItem post={post} />
    </>
  );
};
export default withStyles(styles)(SinglePostView);
