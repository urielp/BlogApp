import * as React from "react";
import { useFormik, Formik } from "formik";
import { useStore, useStoreAsyncVersion } from "../../stores/store";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardFooter from "../Card/CardFooter";
import CardBody from "../Card/CardBody";
// import Button from '../CustomButtons/Button';
import withStyles from "@material-ui/core/styles/withStyles";

import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import CustomInput from "../CustomInput/CustomInput";
import Button from "../CustomButtons/Button";

//'@fontawesome/fontawesome'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFacebookSquare,
  faTwitter,
  faGooglePlus,
} from "@fortawesome/free-brands-svg-icons";

import lstyle from "../../assets/jss/material-dashboard-react/views/loginPageStyle";

interface Props {
  classes: any;
}

const LoginX = (props: Props) => {
  const [StateAsync, DispatchAsync] = useStoreAsyncVersion(true);

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      DispatchAsync("LOGIN", values);
    },
  });

  React.useEffect(() => {
    if (StateAsync.isLoggedIn) {
      //history.push('/dashboard');
    }
    return () => {};
  }, [StateAsync.isLoggedIn]);

  const { classes } = props;

  return (
    <div>
      <FontAwesomeIcon icon={faGooglePlus} size={"4x"} />
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={4}>
            <Card className={classes.textCenter}>
              <form
                className={classes.form}
                role="form"
                onSubmit={loginFormik.handleSubmit}
              >
                <CardHeader color="primary" className={classes.cardHeader}>
                  <h4>Login</h4>
                  <div className={classes.socialLine}>
                    <Button
                      justIcon
                      href="#pablo"
                      target="_blank"
                      color="transparent"
                      onClick={(e: any) => e.preventDefault()}
                    >
                      <FontAwesomeIcon icon={faTwitter} />
                    </Button>
                    <Button
                      justIcon
                      href="#pablo"
                      target="_blank"
                      color="transparent"
                      onClick={(e: any) => e.preventDefault()}
                    >
                      <FontAwesomeIcon icon={faFacebookSquare} />
                    </Button>
                    <Button
                      justIcon
                      href="#pablo"
                      target="_blank"
                      color="transparent"
                      onClick={(e: any) => e.preventDefault()}
                    >
                      <FontAwesomeIcon icon={faGooglePlus} size={"lg"} />
                    </Button>
                  </div>
                </CardHeader>
                <p className={classes.divider}>Or Be Classical</p>
                <CardBody>
                  <CustomInput
                    labelText="First Name..."
                    id="first"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",

                      endAdornment: (
                        <InputAdornment position="end">
                          <People className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <CustomInput
                    labelText="Email..."
                    id="email"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "email",
                      value: loginFormik.values.email,
                      onChange: loginFormik.handleChange,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "password",
                      onChange: loginFormik.handleChange,
                      value: loginFormik.values.password,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputIconsColor}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      ),
                      autoComplete: "off",
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <Button type="submit" simple color="primary" size="lg">
                    Get started
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};
export default withStyles(lstyle)(LoginX);
