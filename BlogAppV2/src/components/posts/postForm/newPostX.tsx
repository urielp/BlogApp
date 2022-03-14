import * as React from 'react';
import Card from '../../Card/Card';
import CardHeader from '../../Card/CardHeader';
import CardBody from '../../Card/CardBody';
import GridContainer from '../../Grid/GridContainer';
import GridItem from '../../Grid/GridItem';
import { TextField } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import rtlStyle from '../../../assets/jss/material-dashboard-react/views/rtlStyle';
import { container } from '../../../assets/jss/material-dashboard-react';
import { useStoreAsyncVersion } from '../../../stores/store';
import Snackbar from '../../Snackbar/Snackbar';
import Warning from '@material-ui/icons/Warning';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import EditorAxe from '../../EditorX/EditorX';

import ReactDOM from 'react-dom';
import { Editor, EditorState } from 'draft-js';
import CardFooter from '../../Card/CardFooter';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import SnackbarContent from '../../Snackbar/SnackbarContent';
import { useFormik, Formik, Form, Field, ErrorMessage } from 'formik';
import InputAdornment from '@material-ui/core/InputAdornment';
import CustomInput from '../../CustomInput/CustomInput';
import Divider from '@material-ui/core/Divider/Divider';
import { Redirect } from 'react-router-dom';
import Button from '../../CustomButtons/Button';

import typographyStyle from '../../../assets/jss/material-dashboard-react/components/typographyStyle';

const styles = createStyles({
  ...typographyStyle,
  ...rtlStyle,
  container: {
    ...container,
    zIndex: 2,
    position: 'relative',
    paddingTop: '20vh',
    color: '#FFFFFF',
    paddingBottom: '200px',
  },
  center: {
    right: '25%',
  },
  labelFont: {
    fontFamily: 'Assistant',
  },
});
const theme = createMuiTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
  typography: {
    fontFamily: '"Assistant","Roboto", "Helvetica", "Arial", sans-serif,',
  },
});

const newPostFormX = (props: any) => {
  const { classes } = props;
  const AsyncDispatch = useStoreAsyncVersion(true)[1];
  const [open, setOpen] = React.useState(false); // for snacks
  const [isOpen, setOpen2] = React.useState(false);
  const [content, setContent] = React.useState<any>();
  const [postTitle, setPostTitle] = React.useState('ללא כותרת');
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  const [errors, setErrors] = React.useState(false);
  const setTitleFromEditor = (title: string) => {
    setPostTitle(title);
  };

  const savePostAndPublish = () => {
    if (!content) {
      setErrors(true);
      setOpen(true);
      return;
    }
    setErrors(false);
    AsyncDispatch('NEW_POST', {
      title: postTitle,
      subTitle: content[0].children[0].text,
      content: JSON.stringify(content),
    }).then(() => {
      props.history.push('/adminx/posts');
    });
  };
  const handleClose = (message: any) => {
    return (
      <Snackbar
        place="tc"
        color="warning"
        classes={{
          root: classes.root, // class name, e.g. `classes-nesting-root-x`
        }}
        icon={Warning}
        message={message}
        open={open}
        closeNotification={() => setOpen(false)}
        close={true}
      />
    );
  };
  const StyledTextField = withStyles({
    root: {
      '& label': {
        transformOrigin: 'top right',
        right: 0,
        left: 'auto',
      },
      '& outline': {
        transformOrigin: 'top right',
        right: 0,
        left: 'auto',
      },
    },
  })(TextField);

  return (
    <MuiThemeProvider theme={theme}>
      <div dir="rtl">
        <GridContainer justify="center">
          <GridItem xs={10} sm={10} md={10}>
            <Card className={classes.textCenter}>
              <CardHeader color="danger" style={{ fontFamily: 'Assistant' }}>
                {postTitle}
                {isOpen}
              </CardHeader>
              <CardBody>
                <EditorAxe
                  editorContent={setContent}
                  setPostTitle={setTitleFromEditor}
                />
                {errors
                  ? handleClose(
                      'כנראה שניסית לשמור תוכן ברירת מחדל\nנא לערוך את הטקסט לפני שמנסים לשמור'
                    )
                  : null}
              </CardBody>
              <CardFooter>
                <div>
                  <Button color="success" onClick={() => savePostAndPublish()}>
                    שמור ופרסם
                  </Button>
                  <Button color="warning">רק לשמור,נפרסם אחר כך</Button>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </MuiThemeProvider>
  );
};
export default withStyles(styles)(newPostFormX);
