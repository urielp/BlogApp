import * as React from "react";
import Card from "../../Card/Card";
import CardHeader from "../../Card/CardHeader";
import CardFooter from "../../Card/CardFooter";
import CardBody from "../../Card/CardBody";
import Button from "../../CustomButtons/Button";
import GridContainer from "../../Grid/GridContainer";
import GridItem from "../../Grid/GridItem";
import Divider from "@material-ui/core/Divider/Divider";
import { TextField } from "@material-ui/core";
import CustomInput from "../../CustomInput/CustomInput";
// import Button from '../CustomButtons/Button';
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import rtlStyle from "../../../assets/jss/material-dashboard-react/views/rtlStyle";
import { container } from "../../../assets/jss/material-dashboard-react";
import { useStoreAsyncVersion } from "../../../stores/store";
import { useFormik } from "formik";
import CircularProgress from "@material-ui/core/CircularProgress";
import LoadingSpinner from "../../loadingSpinner/loadingSpinner";
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
const newPostForm = (props: any) => {
  const { classes } = props;
  const [AsyncState, AsyncDispatch] = useStoreAsyncVersion(true);
  const newPost = useFormik({
    initialValues: {
      author: "NA",
      title: "",
      subtitle: "",
      body: ""
    },
    onSubmit: values => {
      //values.author = AsyncState.user.name;
      console.log(values);
      AsyncDispatch("NEW_POST", values);
      props.history.push("/newPost");
    }
  });
  return (
    <div>
      {/* <div className={classes.container}> */}
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card className={classes.textCenter}>
            <CardHeader color="danger">פוסט חדש</CardHeader>
            <CardBody>
              <form
                className={classes.form}
                role="form"
                onSubmit={newPost.handleSubmit}
              >
                <GridContainer>
                  <GridItem xs={12} sm={12} md={9}>
                    <CustomInput
                      id="title"
                      fullwidth
                      inputProps={{
                        placeholder: "כותרת לפוסט",
                        variant: "outlined"
                      }}
                      formControlProps={{
                        fullWidth: true,
                        value: newPost.values.title,
                        onChange: newPost.handleChange
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={9}>
                    <CustomInput
                      id="subtitle"
                      inputProps={{
                        placeholder: "תיאור קצר",
                        variant: "outlined"
                      }}
                      formControlProps={{
                        fullWidth: true,
                        value: newPost.values.subtitle,
                        onChange: newPost.handleChange
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={9}>
                    <CustomInput
                      id="body"
                      outlined
                      inputProps={{
                        placeholder: "תוכן",
                        variant: "outlined"
                      }}
                      formControlProps={{
                        fullWidth: true,
                        value: newPost.values.body,
                        onChange: newPost.handleChange
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <Button color="primary" type="submit">
                  שמור
                </Button>
              </form>
            </CardBody>
            {/* <CardFooter className={classes.textMuted}>2 days ago</CardFooter> */}
          </Card>
        </GridItem>
      </GridContainer>
      {/* </div> */}
    </div>
  );
};
export default withStyles(styles)(newPostForm);
