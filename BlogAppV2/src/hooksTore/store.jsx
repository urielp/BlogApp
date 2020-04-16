import * as React from 'react';
import axios from 'axios';
export const Store  = React.createContext();

const initialState = {
    user:{name:'',email:''},
    isLoggedIn:false,
    redirectToLoggin:'/login'
};

function reducer (state,action) {

    switch(action.type){
        case 'FETCH_DATA':
            return {...state,epidsodes:action.payload};
        case 'LOGIN':
            return {...state,isLoggedIn:action.payload};
        case 'LOGIN_TEST':
           let status;
           const log =    async () =>{
                status= await axios.post("http://localhost:3000/users/login",action.payload,
            {
              headers:{
                Authorization:localStorage.getItem("token")
              }}).then(results =>{
               localStorage.setItem("token",results.data.token);
               return {isLoggedIn:results.data.isLoggedIn,
                user:results.data.user
            };
               
            }).catch(err =>{
              
            });
                
                return status;
          };
          let val =   log();

          return {...state,isLoggedIn:val.isLoggedIn,user:val.user};
    
        default:
            return state;
    }

}

export function StoreProvider(props){
    const [state,dispatch] = React.useReducer(reducer,initialState);
  
    
    const value = {state,dispatch};
return (
    <Store.Provider value ={value}>{props.children}</Store.Provider>
)

}