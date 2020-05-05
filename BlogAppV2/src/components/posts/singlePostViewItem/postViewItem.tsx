import * as React from "react";
import { Slate, Editable, ReactEditor, withReact, useSlate } from "slate-react";
import { Editor, Transforms, Text, createEditor } from "slate";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import AddIcon from "@material-ui/icons/Add";
// core components
import GridItem from "../../Grid/GridItem"; //"../../components/Grid/GridItem";
import GridContainer from "../../Grid/GridContainer";
import Card from "../../Card/Card";
import CardHeader from "../../Card/CardHeader";
import CardBody from "../../Card/CardBody";
import CardFooter from "../../Card/CardFooter";
import EditorAxe from "../../EditorX/EditorX";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import moment from "moment";
import { createStyles } from "@material-ui/core";

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
});
const SinglePostViewItem = (props: any) => {
  const { classes } = props;
  const editor = React.useMemo(() => withReact(createEditor()), []);
  const [localValue, setValue] = React.useState<any>([]);
  console.log(props.post);
  let content;
  if (props.post.content) {
    content = JSON.parse(props.post.content);
    console.log(content);
  }
  return (
    <>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6}>
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
          <GridItem>
            <h1>Main Title</h1>
            <h2>Sub title</h2>
            {/* {content ? <h1>{content[0].children[0].text}</h1> : null} */}
            {props.post.content ? (
              <EditorAxe
                isReadOnly={true}
                localValue={JSON.parse(props.post.content)}
              />
            ) : (
              <EditorAxe isReadOnly={true} localValue={content} />
            )}
          </GridItem>
        </GridItem>
      </GridContainer>
    </>
  );
};
export default withStyles(styles)(SinglePostViewItem);
