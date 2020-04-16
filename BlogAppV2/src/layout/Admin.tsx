import * as React from 'react'
import routes from '../routes';
import protectedRoutes from '../protectedRoutes';
// reactstrap components
import { Route, Switch, Redirect } from "react-router-dom";
//import {Navbars} from '../components/navbar/navbar';
import {Store} from '../hooksTore/store';
import SuperProtected,{ProtectedRouteProps} from '../components/protectedRoutes/superProtected';
import {useStoreAsyncVersion} from '../stores/store';
export const  Adminlayout  = (props:any) => {
 
    const {state,dispatch} = React.useContext(Store);
    const [testStateAsync,testDispatchAsync] = useStoreAsyncVersion(true);
    const [defaultProtectedRouteProps,setDefaultProtectedProps]=React.useState<ProtectedRouteProps>( {
        isLoggedIn: !!testStateAsync.isLoggedIn,
        whenloggedInPath: '/dashboard',
        whenNotLoggedInredirectTo: state.redirectToLoggin || '/login',
        setRedirectPathOnAuthentication:()=>'/dashboard'
      });
      React.useEffect(() => {
        
        console.log('rendering if testAsync updated',testStateAsync);
        setDefaultProtectedProps({
            isLoggedIn: !!testStateAsync.isLoggedIn,
            whenloggedInPath: '/dashboard', 
            whenNotLoggedInredirectTo: state.redirectToLoggin || '/login',
            setRedirectPathOnAuthentication:()=>'/dashboard'
          })
          return ()=>{
              console.log('unsubscribe')
          };
      },[testStateAsync]);

    return(
        <div className="bg-lighter" style={{height: "100vh"}}>
               {/* <Navbars/> */}
           <div>
                   <Switch>
                {
                   routes.map((prop,key) =>{
                       return( <Route
                        path={prop.path}
                        component={prop.component}
                        push
                        key={key} 
                        >
                        </Route> 
                       )
                    })
                }
                {/* WORKING UNCOMMENT WHEN NEED TO USE
                {
                    protectedRoutes.map((t,key)=>{
                        console.log(t);
                        return (
                            <ProtectedRoute path={props.path} 
                            component={t.component}
                            key={key}
                            />
                        )
                    })
                } */}
                {
                 protectedRoutes.map((t,key)=>{
                  return (  <SuperProtected 
                        key={key}
                        {...defaultProtectedRouteProps} 
                        path={t.path} 
                        component={t.component}/>);
                    })
                }
            </Switch>
        </div>
            </div>
    );

}
