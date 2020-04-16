import { initStore } from "./store";
import axios from "axios";
import { resolveTxt } from "dns";
import { useState } from "react";
const postsStore = () => {
  const actions = {
    GET_POSTS: async (curState: any, payload: any) => {
      let promiseState = axios
        .get("http://localhost:3000/articles", payload)
        .then(returnedResults => {
          return {
            posts: returnedResults.data.articles
          };
        })
        .then(final => {
          return { ...curState, ...final };
        });

      return promiseState;
    }
  };
  initStore(actions, {
    posts: []
  });
};
export default postsStore;
