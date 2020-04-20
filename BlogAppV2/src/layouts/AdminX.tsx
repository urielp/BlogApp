import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Navbar from "../components/Navbars/Navbar";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import FixedPlugin from "../components/FixedPlugin/FixedPlugin";
import routes from "../routes";
import protectedRoutes from "../protectedRoutes";
import dashboardStyle from "../assets/jss/material-dashboard-react/layouts/dashboardStyle";
import SuperProtected, {
  ProtectedRouteProps
} from "../components/protectedRoutes/superProtected";
import { useStoreAsyncVersion } from "../stores/store";
import image from "../assets/img/sidebar-2.jpg";
import logo from "../assets/img/reactlogo.png";
import rtlStyle from "../assets/jss/material-dashboard-react/layouts/rtlStyle";

interface Props {
  classes: any;
  location: any;
  history: any;
}

interface State {
  image: string;
  color: string;
  hasImage: boolean;
  fixedClasses: string;
  mobileOpen: boolean;
}

const AdminX = (props: Props) => {
  const [image, setImage] = React.useState("");
  const [color, setColor] = React.useState("blue");
  const [hasImage, setHasImage] = React.useState(true);
  const [fixedClasses, setfixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setIsMobileOpen] = React.useState(false);
  let refs: any;
  const mounted = React.useRef();

  /****
   * Belong to the plugin uncomment if needed
   */
  /*
  const handleImageClick = (i: string) => {
    setImage(i);
  };
  const handleColorClick = (c: string) => {
    setColor(c);
  };

  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setfixedClasses("dropdown show");
    } else {
      setfixedClasses("dropdown");
    }
  };
*/
  const handleDrawerToggle = () => {
    setIsMobileOpen(!mobileOpen);
  };

  const getRoute = () => {
    return props.location.pathname !== "/admin/maps";
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setIsMobileOpen(false);
    }
  };

  function didUpdated() {
    if (props.history.location.pathname !== props.location.pathname) {
      refs.mainPanel.scrollTop = 0;
      if (mobileOpen) {
        setIsMobileOpen(false);
      }
    }
  }
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(refs.mainPanel);
    }
    window.addEventListener("resize", resizeFunction);
    didUpdated();
    return () => {
      window.removeEventListener("resize", resizeFunction);
    };
  }, []);
  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        if (prop.layout === "/adminx") {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        }
      })}
    </Switch>
  );
  const { classes, ...rest } = props;
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"Creative Tim"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        rtlActive={true}
        {...rest}
      />
      <div className={classes.mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content} style={{ display: "flex" }}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {getRoute() ? <Footer /> : null}
        {/* <FixedPlugin
        handleImageClick={this.handleImageClick}
        handleColorClick={this.handleColorClick}
        bgColor={this.state.color}
        bgImage={this.state.image}
        handleFixedClick={this.handleFixedClick}
        fixedClasses={this.state.fixedClasses}
      /> */}
      </div>
    </div>
  );
};
export default withStyles(rtlStyle)(AdminX);
