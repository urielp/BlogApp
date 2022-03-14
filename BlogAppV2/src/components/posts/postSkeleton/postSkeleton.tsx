import * as React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
// core components
import Card from "../../Card/Card";
import CardBody from "../../Card/CardBody";
import imagesStyles from "../../../assets/jss/material-dashboard-react/imageStyles";
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import createStyles from "@material-ui/core/styles/createStyles";

const title = {
  color: "#3C4858",
  textDecoration: "none",
  fontWeight: 700,
  marginTop: 30,
  marginBottom: "25px",
  minHeight: "32px",
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  "& small": {
    color: "#777",
    fontWeight: 400,
    lineHeight: "1",
  },
};

const styles = createStyles({
  root: {
    display: "flex",
  },
  ...imagesStyles,
  textMuted: {
    color: "#6c757d",
  },
  cardTitleX: {
    ...title,
    marginTop: 0,
    marginBottom: "3px",
    minHeight: "auto",
    "& a": {
      ...title,
      marginTop: ".625rem",
      marginBottom: "0.75rem",
      minHeight: "auto",
    },
    fontFamily: "Assistant",
  },
  cover: {
    width: 151,
  },
  content: {
    flex: "1 0 auto",
  },
});
const PostSkeletonItem = (props: any) => {
  const { classes } = props;

  return (
    <div>
      <Card className={classes.root} style={{ width: "58.75rem" }}>
        <Skeleton animation="wave" variant="rectangular" width={"100%"} height={180} />
        <CardBody>
          <Link to={""} >
            {/* <h4 className={classes.cardTitleX}>{props.post.title}</h4> */}
             <Typography component="div" key={"h4"} variant={"h4"}>
             <Skeleton />
        </Typography>
          </Link>
          <small className={classes.textMuted}>By: <Skeleton /></small> 
            <p><Skeleton /></p>
            <p><Skeleton /></p>
        </CardBody>
      </Card>
    </div>
  );
};
export default withStyles(styles)(PostSkeletonItem);
