import * as React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../Grid/GridItem"; //"../../components/Grid/GridItem";
import GridContainer from "../../Grid/GridContainer";
import Button from "../../CustomButtons/Button";
import Card from "../../Card/Card";
import CardHeader from "../../Card/CardHeader";
import CardBody from "../../Card/CardBody";
import CardFooter from "../../Card/CardFooter";
import moment from "moment";
import { createStyles } from "@material-ui/core";
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
const SinglePostViewItem = (props: any) => {
  const { classes } = props;
  console.log(props);
  return (
    <>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <div>
                <h1 className={classes.cardTitleWhite}>{props.post.title}</h1>
                <h4>{props.post.subTitle}</h4>
                <small>נכתב על ידי : {props.post.author}</small>
                <br />
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
              </div>
            </CardHeader>
            <CardBody>
              <p>{props.post.body}</p>
            </CardBody>
            <CardFooter>Footer</CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
};
export default withStyles(styles)(SinglePostViewItem);
