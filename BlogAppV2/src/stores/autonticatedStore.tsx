import {initStore} from './hookStore';
import axios from 'axios';

const configureStore = () => {
    const actions = {
        LOGGED_IN:async (cureState:any,token:any)=>{
         console.log(" LOGGED_IN");
          console.log("currentState",cureState);
           let promise = await axios.get('http://localhost:3000/users/verifytoken',
            {
                headers:{
                Authorization:token
            } 
            });
            return {isLoggedIn:promise.data.value};
        }
    };
    initStore(actions,{});
}

export default configureStore;