import * as React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
// core components
import Card from "../../Card/Card";
import CardBody from "../../Card/CardBody";
import { createStyles, Grid } from "@material-ui/core";
import imagesStyles from "../../../assets/jss/material-dashboard-react/imageStyles";
import moment from "moment";
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
    lineHeight: "1"
  }
};

const styles = createStyles({
  root: {
    display: "flex"
  },
  ...imagesStyles,
  textMuted: {
    color: "#6c757d"
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
      minHeight: "auto"
    }
  },
  cover: {
    width: 151
  },
  content: {
    flex: "1 0 auto"
  }
});
const PostItem = (props: any) => {
  const { classes } = props;
  console.log(props.post);
  return (
    <div>
      <Card className={classes.root} style={{ width: "58.75rem" }}>
        <img
          style={{ height: "180px", width: "100%", display: "block" }}
          className={classes.cover}
          src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22843%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20843%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16302226ee9%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A42pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16302226ee9%22%3E%3Crect%20width%3D%22843%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22314.0703125%22%20y%3D%22109.35%22%3E843x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
          //src={postImage}
          alt="Card-img-cap"
        />
        <CardBody>
          <Link
            to={{
              pathname: "/adminx/post",
              hash: "#t",
              state: { postID: props.post._id }
            }}
          >
            <h4 className={classes.cardTitleX}>{props.post.title}</h4>
          </Link>
          <small className={classes.textMuted}>By: {props.post.author}</small>
          {props.post.subTitle ? (
            <p>{props.post.subTitle}</p>
          ) : (
            <p>{props.post.body}</p>
          )}
          <p>
            <small className={classes.textMuted}>
              פורסם ב: {moment(props.post.createdAt).format("lll")}
            </small>
            <br />
            {props.post.updatedAt ? (
              <small className={classes.textMuted}>
                עודכן ב: {"some date value"}
              </small>
            ) : null}
            {/* <small className={classes.textMuted}>Last updated 3 mins ago</small> */}
          </p>
        </CardBody>
      </Card>
    </div>
  );
};
export default withStyles(styles)(PostItem);
