import * as React from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
import { useStore, useStoreAsyncVersion } from "../../stores/store";

export interface ProtectedRouteProps extends RouteProps {
  isLoggedIn: boolean;
  whenloggedInPath: string;
  whenNotLoggedInredirectTo: string;
  setRedirectPathOnAuthentication: (path: String) => void;
}

export const SuperProtectd: React.FC<ProtectedRouteProps> = (props) => {
  const currentLocation = useLocation();
  const [testStateAsync, testDispatchAsync] = useStoreAsyncVersion(true);

  let redirectPath = props.whenloggedInPath;

  React.useEffect(() => {
    console.log("testStateAsync", testStateAsync);
  }, [testStateAsync]);

  if (!props.isLoggedIn) {
    console.log(
      "not logged in so we will redirect to:",
      props.whenNotLoggedInredirectTo
    );
    props.setRedirectPathOnAuthentication("/login");
    redirectPath = props.whenNotLoggedInredirectTo;
  }
  console.log(redirectPath, currentLocation.pathname);
  if (redirectPath !== currentLocation.pathname) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else {
    return <Route {...props} />;
  }
};

export default SuperProtectd;
