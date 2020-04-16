import {useState,useEffect}from 'react'


let globalState:any;
let listeners :any[]= [];
let actions:any;

export const useStore = (shouldListen = true,comeFrom:string) => {
    const setState =  useState(globalState)[1];

    
    const dispatch = (actionIdentifier:any,payload:any) => {

      const newState = actions[actionIdentifier](globalState,payload)
      newState.then((t:any)=>{
        // console.log('t',t);
        globalState ={...globalState,...t};
        for(const listner of listeners){
            listner(globalState);
        }
      })

    };

    useEffect(()=>{
        if (shouldListen) {
            listeners.push(setState);
          }
      
          return () => {
             
            if (shouldListen) {
              listeners = listeners.filter(li => li !== setState);
            }
          };
        }, [setState, shouldListen]);
      
        return [globalState, dispatch];
      
};

export const initStore = (userActios:any,initialState:{}) =>{
    // console.log('init store was called');
    if(initialState){
        globalState = {...globalState,...initialState};
    }
    actions = {...actions,...userActios};
}