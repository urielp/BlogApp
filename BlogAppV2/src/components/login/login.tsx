import * as React from 'react';
import {useFormik, Formik} from 'formik';
//import bcrypt from 'bcryptjs';
//import {Link,useHistory,useLocation} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {useStore, useStoreAsyncVersion} from '../../stores/store';
// import {
//     Button,
//     Card,
//     CardHeader,
//     CardBody,
//     FormGroup,
//     Form,
//     Input,
//     InputGroupAddon,
//     InputGroupText,
//     InputGroup,
//     Container,
//     Row,
//     Col
//   } from "reactstrap";
  import {Store} from '../../hooksTore/store';

  export const  Login = (props:any) => {

   // const {state,dispatch} = React.useContext(Store);
    const [StateAsync,DispatchAsync] = useStoreAsyncVersion(true);
 
    //let location = useLocation();
    //let history = useHistory();

    const [count,setCount] = React.useState(0);

    React.useEffect(()=>{
      if(StateAsync.isLoggedIn){
        //history.push('/dashboard');
      };
      return ()=> {
        console.log('unsubscribe');
      }
    },[StateAsync.isLoggedIn]);

    const loginFormik = useFormik({
        initialValues:{
            email:"",
            password:"",
            passowordTest:""
        },
        onSubmit:values => {
          // dispatch({
          //   type: 'LOGIN_TEST',
          //   payload: values
          // });
          DispatchAsync('LOGIN',values);
          // bcrypt.hash(values.password,10).then(hashed=>{ 
          //     DispatchAsync('LOGIN',values);
          //     //testDispatchAsync('JUST_FOR_TEST',values);
          // });     
        } 
     });
    return(
        <>
        <h1>
          New Login Form Should be here
        </h1>
        {/* <main >
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span /> 
              <span /> 
              <span />
              <span />
            </div>
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white pb-5">
                      <div className="text-muted text-center mb-3">
                          <small>{props.userName} Sign in with</small>
                      </div>
                      <div className="btn-wrapper text-center">
                        <Button
                          className="btn-neutral btn-icon"
                          color="default"
                          href="#pablo"
                          onClick={() => {setCount(count+1);}}
                        >
                          <span className="btn-inner--icon mr-1">
                            <img
                              alt="..."
                           
                              // src={require('../../assets/img/icons/common/github.svg')}
                            />
                          </span>
                          <span className="btn-inner--text">Github</span>
                        </Button>
                        <Button
                          className="btn-neutral btn-icon ml-1"
                          color="default"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <span className="btn-inner--icon mr-1">
                            <img
                              alt="..."
                              // src={require("../../assets/img/icons/common/google.svg")}
                            />
                          </span> 
                          <span className="btn-inner--text">Google</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>Or sign in with credentials</small>
                      </div>
                      <Form role="form"
                      onSubmit={loginFormik.handleSubmit}>
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input 
                            placeholder="Email"
                            id="email"  
                            onChange={loginFormik.handleChange} 
                            value={loginFormik.values.email}
                            type="email" />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Password"
                              type="password"
                              autoComplete="off"
                              onChange={loginFormik.handleChange} 
                             value={loginFormik.values.password}
                             id="password"
                            />
                          </InputGroup>
                        </FormGroup>
                        <div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id=" customCheckLogin"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor=" customCheckLogin"
                          >
                            <span>Remember me</span>
                          </label>
                        </div>
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="submit"
                          >
                            Sign in
                          </Button>
                        </div>
              
                      </Form>
                    </CardBody>
                  </Card>
                  <Row className="mt-3">
                    <Col xs="6">
                      <a
                        className="text-light"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <small>Forgot password?</small>
                      </a>
                    </Col>
                    <Col className="text-right" xs="6">
                      <a
                        className="text-light"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <small>Create new account</small>
                      </a>
                      <Link to='/form'>Home</Link>{' '}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
        </main> */}
        </>
    );
  }
