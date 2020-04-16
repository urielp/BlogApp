import * as React from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import Menu from "@material-ui/icons/Menu";
import headerStyle from '../../assets/jss/material-dashboard-react/components/headerStyle';

const Header =(props:any) =>{
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { classes } = props;

  React.useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  });
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const headerColorChange = () => {
    // const { color, changeColorOnScroll } = props;
    const { classes, color ,changeColorOnScroll} = props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  };
  const { color, rightLinks, leftLinks, brand, fixed, absolute } = props;

  const brandComponent = <Button className={classes.title}>{brand}</Button>;

  return(
    <AppBar>
    <Toolbar className={classes.container}>
      {leftLinks !== undefined ? brandComponent : null}
      <div className={classes.flex}>
        {leftLinks !== undefined ? (
          <Hidden smDown implementation="css">
            {leftLinks}
          </Hidden>
        ) : (
          brandComponent
        )}
      </div>
      <Hidden smDown implementation="css">
        {rightLinks}
      </Hidden>
      <Hidden mdUp>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
        >
          <Menu />
        </IconButton>
      </Hidden>
    </Toolbar>
    <Hidden mdUp implementation="js">
      <Drawer
        variant="temporary"
        anchor={"right"}
        open={mobileOpen}
        classes={{
          paper: classes.drawerPaper
        }}
        onClose={handleDrawerToggle}
      >
        <div className={classes.appResponsive}>
          {leftLinks}
          {rightLinks}
        </div>
      </Drawer>
    </Hidden>
  </AppBar>
);
  
}
export default withStyles(headerStyle)(Header);