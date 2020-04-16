import * as React from 'react';
import {Component} from 'react';
import protectedRoutes from '../../protectedRoutes';
import isAuthonticated from '../utils/authVerification';
// reactstrap components
import { Route, Switch, Redirect } from "react-router-dom";
import {Store} from '../../hooksTore/store';
// export const ProtectedRoute = (children:any,...rest:any)=>{
//     const {state,dispatch} = React.useContext(Store);
//     console.log('protected')
//     console.log(children,rest)
//     return (
//         <Route
//           {...rest}
//           render={({ location }) =>
//             state.isLoggedIn ? (
//               children.children
//             ) : (
//               <Redirect
//                 to={{
//                   pathname: "/login",
//                   state: { from: location }
//                 }}
//               />
//             )
          
//           }
//         />
//       ); 
// }


export const ProtectedRoute= ({component, ...rest }:any) => {
    const {state,dispatch} = React.useContext(Store);
    return (   
            <Route {...rest} render={(props:any) => (
                state.isLoggedIn === true
                ? React.createElement(component,props)
                : <Redirect to={{pathname:'/login'}} />
            )} />
        );
}
  