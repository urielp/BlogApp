import { initStore } from "./store";
import axios from "axios";
const authStore = () => {
  const actions = {
    LOGIN: async (curState: any, payload: any) => {
      let promiseState = axios
        .post("http://localhost:3000/users/login", payload, {
          headers: {
            Authorization: payload.token,
          },
        })
        .then((returnedResults) => {
          return {
            isLoggedIn: returnedResults.data.isLoggedIn,
            user: returnedResults.data.user,
            token: returnedResults.data.token,
            isAuthonticated: returnedResults.data.isLoggedIn,
          };
        })
        .then((final) => {
          return { ...curState, ...final };
        });
      console.log(promiseState);
      return promiseState;
    },
    IS_AUTHONTICATED: async (curState: any, payload: any) => {
      let promiseState = await axios
        .get("http://localhost:3000/users/verifytoken", {
          headers: {
            Authorization: payload.token,
          },
        })
        .then((results) => {
          return { isLoggedIn: results.data.value };
        })
        .then((finalPromiseState) => {
          return { ...curState, finalPromiseState };
        });
      return promiseState;
    },
    JUST_FOR_TEST: (curState: any, payload: any) => {
      console.log("payload", payload);
      return { ...curState, ...payload };
    },
  };
  initStore(actions, {
    isAuthonticated: false,
    user: {
      name: "",
      email: "",
    },
    value: 0,
    token: "",
    isLoggedIn: false,
    redirectToLoggin: "/login",
  });
};

export default authStore;
