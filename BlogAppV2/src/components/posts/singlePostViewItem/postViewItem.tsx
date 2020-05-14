import * as React from "react";
import { Slate, Editable, ReactEditor, withReact, useSlate } from "slate-react";
import { Editor, Transforms, Text, createEditor } from "slate";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
// core components
import GridItem from "../../Grid/GridItem"; //"../../components/Grid/GridItem";
import GridContainer from "../../Grid/GridContainer";
import Card from "../../Card/Card";
import CardHeader from "../../Card/CardHeader";
import CardBody from "../../Card/CardBody";
import CardFooter from "../../Card/CardFooter";
import CardAvatar from "../../Card/CardAvatar";
import avatar from "../../../assets/img/faces/marc.jpg";
import EditorAxe from "../../EditorX/EditorX";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import moment from "moment";
import { createStyles } from "@material-ui/core";
import { wrap } from "module";

const styles = createStyles({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: 300,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  title: {
    fontSize: "40px",
  },
  authorComp: {
    marginBottom: "1.6rem",
    paddingTop: "20px",
  },
  description: {
    fontSize: "24px",
    lineHeight: "0",
  },
  avatar: {
    maxWidth: "50px",
    maxHeight: "50px",
    margin: "0",
  },
});
const SinglePostViewItem = (props: any) => {
  const { classes } = props;
  const editor = React.useMemo(() => withReact(createEditor()), []);
  const [localValue, setValue] = React.useState<any>(null);
  const [headLine, setHeadLine] = React.useState("");
  const [shortDescription, setShortDescription] = React.useState("");

  let content: any;
  // if (props.post.content) {
  //   content = JSON.parse(props.post.content);
  //   console.log(content);
  // }

  React.useEffect(() => {
    if (props.post.content) {
      content = JSON.parse(props.post.content);
      setHeadLine(content[0].children[0].text);
      setShortDescription(content[1].children[0].text);
      setValue(content.slice(2));
    }
  }, [props.post.content]);
  return (
    <>
      <GridContainer justify="center">
        <GridItem xs={6} sm={6} md={6}>
          <div>
            <h1 className={classes.title}> {headLine}</h1>
          </div>
          <div>
            <h2 className={classes.description}>{shortDescription}</h2>
          </div>
        </GridItem>
      </GridContainer>
      {/* <Card>
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
    
                </p>
              </div>
            </CardHeader>
            <CardBody>
              <p>{props.post.body}</p>
            </CardBody>
            <CardFooter>Footer</CardFooter>
          </Card> */}

      {/* <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <CardAvatar profile={true} className={classes.avatar}>
            <a href="#pablo" onClick={(e) => e.preventDefault()}>
              <img src={avatar} alt="..." />
            </a>
          </CardAvatar>
        </GridItem>
        <GridItem xs={12} sm={12}>
          <h5>
            <small>נכתב על ידי : {props.post.author}</small>
          </h5>
        </GridItem>
        <GridItem xs={12} sm={12}>
          <p>
            <small className={classes.textMuted}>
              פורסם ב: {moment(props.post.createdAt).format("lll")}
            </small>
          </p>
          <p>
            <span>
              {props.post.updatedAt ? (
                <small className={classes.textMuted}>
                  עודכן ב: {"some date value"}
                </small>
              ) : null}
            </span>
          </p>
        </GridItem>
      </GridContainer> */}
      {/* 
      <div>
        <ul
          style={{
            display: "inline-block",
            // listStyleType: "none",
            marginLeft: "-4px",
            padding: "10px",
            paddingTop: "10px",
          }}
        >
          <div>
            <CardAvatar profile={true} className={classes.avatar}>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
          </div>

          <li
            style={{
              display: "inline-block",
              // listStyleType: "none",
              marginLeft: "-4px",
              padding: "10px",
            }}
          >
            <h5>
              <small>נכתב על ידי : {props.post.author}</small>
            </h5>
          </li>
          <li
            style={{
              display: "inline-block",
              // listStyleType: "none",
              marginLeft: "-4px",
              padding: "10px",
            }}
          >
            <p>
              <small className={classes.textMuted}>
                פורסם ב: {moment(props.post.createdAt).format("lll")}
              </small>
            </p>
            <p>
              <span>
                {props.post.updatedAt ? (
                  <small className={classes.textMuted}>
                    עודכן ב: {"some date value"}
                  </small>
                ) : null}
              </span>
            </p>
          </li>
        </ul>
      </div> */}

      <div style={{ flexGrow: 1, marginTop: "24px", marginBottom: "24px" }}>
        <Grid container justify={"center"} alignItems="center" direction="row">
          <Grid container item xs={6} spacing={8}>
            <Row {...props} />
          </Grid>
        </Grid>
      </div>

      <div>
        <GridContainer justify="center">
          <GridItem xs={6} sm={6} md={6}>
            <div>
              {/* {content ? <h1>{content[0].children[0].text}</h1> : null} */}
              {props.post.content ? (
                <EditorAxe
                  isReadOnly={true}
                  localValue={JSON.parse(props.post.content).slice(2)}
                />
              ) : (
                <EditorAxe isReadOnly={true} localValue={content} />
              )}
            </div>
          </GridItem>
        </GridContainer>
      </div>
    </>
  );
};

const Row = (props: any) => {
  //TODO:this should be SA component
  return (
    <>
      <Grid item xs={3} style={{ flexBasis: "auto" }}>
        <div>
          <CardAvatar profile={true} className={props.classes.avatar}>
            <a href="#pablo" onClick={(e) => e.preventDefault()}>
              <img src={avatar} alt="..." />
            </a>
          </CardAvatar>
        </div>
      </Grid>
      <Grid item xs={3} style={{ flexBasis: "auto" }}>
        <div>
          <p>
            <small>נכתב על ידי : {props.post.author}</small>
          </p>
        </div>
      </Grid>
      <Grid item xs={3} style={{ flexBasis: "auto" }}>
        <div>
          <p>
            <small className={props.classes.textMuted}>
              פורסם ב: {moment(props.post.createdAt).format("lll")}
            </small>
          </p>
          <p>
            <span>
              {props.post.updatedAt ? (
                <small className={props.classes.textMuted}>
                  עודכן ב: {"some date value"}
                </small>
              ) : null}
            </span>
          </p>
        </div>
      </Grid>
      <Grid item xs={3} style={{ flexBasis: "auto" }}>
        <div>
          <p>
            <small>זמן קריאה : 1 דק' </small>
          </p>
        </div>
      </Grid>
    </>
  );
};
export default withStyles(styles)(SinglePostViewItem);
