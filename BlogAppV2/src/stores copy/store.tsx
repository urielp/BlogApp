import {useState,useEffect}from 'react'


let globalState:any ;
let listners: any[] = [];
let actions :any ;

export const useStore = (shouldListen = true) =>{
    const setState =  useState(globalState)[1];
     const dispatch = (actionIdentifier:any,payload:any) =>{
     const newState =  actions[actionIdentifier](globalState,payload);
        
     globalState = {...globalState,...newState};
     for (const listner of listners){
         listner(globalState);
     }
   };
   //when the componnet uses this store the listener will be pushed
   //and removed on cleanup(unmount)
   useEffect(()=>{
       if(shouldListen){
            listners.push(setState);
       }
        return () => {
       if(shouldListen){

            listners = listners.filter((listener:any) => listener!== setState);
       }
        }
   },[setState,shouldListen]);
return [globalState,dispatch];
};

export const useStoreAsyncVersion = (shouldListen = true) =>{
    const setState =  useState(globalState)[1];
     const dispatch = (actionIdentifier:any,payload:any) =>{
     const newState =  actions[actionIdentifier](globalState,payload);

     if(typeof newState.then === 'function'){
     newState.then((resolved:any) =>{
        globalState = {...globalState,...resolved};
        for (const listner of listners){
            listner(globalState);
        }
     })
    }
    else{
        globalState = {...globalState,...newState};
        for (const listner of listners){
            listner(globalState);
        }
    }
    
   };
   //when the componnet uses this store the listener will be pushed
   //and removed on cleanup(unmount)
   useEffect(()=>{
       if(shouldListen){
            listners.push(setState);
       }
        return () => {
       if(shouldListen){

            listners = listners.filter((listener:any) => listener!== setState);
       }
        }
   },[setState,shouldListen]);
return [globalState,dispatch];
};
export const initStore = (userActions:any,initialState:any) =>{
    if(initialState){
        globalState = {...globalState,...initialState};     
    }
    actions = {...actions,...userActions};
}