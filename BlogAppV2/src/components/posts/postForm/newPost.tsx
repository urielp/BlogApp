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
import { useFormik, Formik, Form, Field, ErrorMessage } from "formik";
import Snackbar from "../../Snackbar/Snackbar";
import SnackbarContent from "../../Snackbar/SnackbarContent";
import Warning from "@material-ui/icons/Warning";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";

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
  const [open, setOpen] = React.useState(false); //for snacks
  const [isOpen, setOpen2] = React.useState(false);

  const handleClose = (message: any) => {
    console.log(message);
    return (
      <Snackbar
        place="bc"
        color="warning"
        icon={Warning}
        message={
          `${message.title ? message.title : ""}
           ${message.subtitle ? message.subtitle : ""} ` +
          `${message.body ? message.body : ""}\n`
        }
        open={open}
        closeNotification={() => setOpen(false)}
        close={true}
      />
    );
  };

  return (
    <div>
      <Formik
        initialValues={{
          author: "NA",
          title: "",
          subtitle: "",
          body: ""
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validate={values => {
          const errors: any = {};
          if (!values.title) {
            //setOpen(true);
            errors.title = "כותרת לא יכולה להיות ריקה";
          }
          if (!values.subtitle) {
            //setOpen(true);
            errors.subtitle = "\nחובה להזין תיאור קצר";
          }
          if (!values.body) {
            //setOpen(true);
            errors.body = "פוסט לא יכול להיות ריק";
          }
          if (errors.body || errors.title || errors.subtitle) {
            setOpen(true);
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          AsyncDispatch("NEW_POST", values);
          props.history.push("/adminx/posts");
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
              <Card className={classes.textCenter}>
                <CardHeader color="danger">פוסט חדש{isOpen}</CardHeader>
                <CardBody>
                  <form
                    className={classes.form}
                    role="form"
                    onSubmit={handleSubmit}
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
                            value: values.title,
                            onChange: handleChange
                          }}
                        />
                        {/* {errors.title ? handleClose(errors.title) : null} */}
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
                            value: values.subtitle,
                            onChange: handleChange
                          }}
                        />
                        {/* {errors.subtitle ? handleClose(errors.subtitle) : null} */}
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
                            value: values.body,
                            onChange: handleChange
                          }}
                        />
                        {errors.body || errors.title || errors.subtitle
                          ? handleClose(errors)
                          : null}
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
        )}
      </Formik>
    </div>
  );
};
export default withStyles(styles)(newPostForm);
