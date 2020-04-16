import {useState,useEffect} from 'react';
import axios from 'axios';

let initValue:any = { loading: true, isLoggedIn: undefined, user: {} };
let sessionCache:any = undefined;
let promiseCache:any = undefined;

const getCachedPromise = () =>{
    if(!promiseCache){
        promiseCache = axios.get('http://localhost:3000/users/verifytoken',
        {
            headers:{
            Authorization:localStorage.getItem("token")
        } 
        });
        promiseCache.then((session:any) =>{sessionCache = session})
                    .catch((error:any) =>{sessionCache = {error}});
    }
    return promiseCache;
}


// track all session data consumers here
let consumers:any = [];

export const login = async (values:any,token:any) => {
  sessionCache = await axios.post("http://localhost:3000/users/login",values,
  {
    headers:{
      Authorization:token
    }})
  //consumers.forEach((c:any) => c(sessionCache));
  console.log("aaa",sessionCache);
  return sessionCache;
};


export const useSession = () => {
    // use alredy resolved session from sessionCache,
    // or initValue, if session is not yet resolved.
    const [session, setSession] = useState(sessionCache || initValue);
  
    useEffect(() => {
      // we don't need to deal with promise
      // if session has already been resolved.
      if (sessionCache) {
        // there is a chance that session has not been resolved
        // during first `useState` call, but is already resolved
        // during first `useEffect` call.
        if (session !== sessionCache) {
          setSession(sessionCache);
        }
        return;
      }
  
      // did not finish promise execution yet, need to attach listeners to it.
      getCachedPromise()
        .then((session:any) => setSession(session))
        .catch((error:any) => setSession({ error }));
    }, [session]);
  
    return session;
  };
