import { useState, useEffect } from "react";
import moment from "moment";
let globalState: any;
let listners: any[] = [];
let actions: any;

export const useStore = (shouldListen = true) => {
  const setState = useState(globalState)[1];
  const dispatch = (actionIdentifier: any, payload: any) => {
    const newState = actions[actionIdentifier](globalState, payload);

    globalState = { ...globalState, ...newState };

    for (const listner of listners) {
      listner(globalState);
    }
  };
  //when the componnet uses this store the listener will be pushed
  //and removed on cleanup(unmount)
  useEffect(() => {
    if (shouldListen) {
      listners.push(setState);
    }
    return () => {
      if (shouldListen) {
        listners = listners.filter((listener: any) => listener !== setState);
      }
    };
  }, [setState, shouldListen]);
  return [globalState, dispatch];
};

export const useStoreAsyncVersion = (shouldListen = true) => {
  const setState = useState(globalState)[1];
  const dispatch = async (actionIdentifier: any, payload: any) => {
    const test = async () => {
      const newState = await actions[actionIdentifier](globalState, payload);

      return (globalState = { ...globalState, ...newState });
    };
    let t = await test();

    globalState = { ...globalState, ...t };
    for (const listner of listners) {
      listner(globalState);
    }

    // if (typeof newState.then === "function") {
    //   newState.then((resolved: any) => {
    //     globalState = { ...globalState, ...resolved };

    //     for (const listner of listners) {
    //       listner(globalState);
    //     }
    //   });
    // } else {
    //   globalState = { ...globalState, ...newState };

    //   for (const listner of listners) {
    //     listner(globalState);
    //   }
    // }
  };
  //when the componnet uses this store the listener will be pushed
  //and removed on cleanup(unmount)
  useEffect(() => {
    console.log("global sate changed ?");
    console.log(globalState);
    if (shouldListen) {
      listners.push(setState);
    }
    return () => {
      if (shouldListen) {
        listners = listners.filter((listener: any) => listener !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [globalState, dispatch];
};
export const initStore = (userActions: any, initialState: any) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
