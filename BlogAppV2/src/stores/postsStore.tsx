import { initStore } from "./store";
import axios from "axios";

const postsStore = () => {
  const actions = {
    GET_POSTS: async (curState: any, payload: any) => {
      const getPosts = async () => {
        const results = await axios.get(
          "http://localhost:3000/articles",
          payload
        );
        return { posts: results.data.articles };
      };
      let posts = await getPosts();
      return { ...curState, ...posts };
    },
    NEW_POST: async (curState: any, payload: any) => {
      const postNewPost = async () => {
        const results = await axios.post(
          "http://localhost:3000/articles",
          payload
        );
      };
      postNewPost();
    }
  };
  initStore(actions, {
    posts: [],
    dummy: {}
  });
};
export default postsStore;
