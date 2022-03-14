import { initStore } from "./store";
import axios from "axios";

const postsStore = () => {
  const actions = {
    GET_POSTS: async (curState: any, payload: any) => {
      const getPosts = async () => {
        console.log('get all postas')
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
      console.log(payload);
      const postNewPost = async () => {
        const results = await axios.post(
          "http://localhost:3000/articles",
          payload
        );
      };
      postNewPost();
    },
    GET_POST: async (curState: any, payload: any) => {
      const getPost = async () => {
        const results = await axios.get(
          "http://localhost:3000/articles/" + payload
        );
        return results.data.article;
      };
      let post = await getPost();
      return post;
    },
    GET_POST_PAGINATION: async (curState: any, payload: any) => {
      
      const getPostWithPagination = async () => {
        const results = await axios.get(
          "http://localhost:3000/articles/withPagination" ,{params:{page:payload.page}}
        );
        return results.data;
      };
      let someData = await getPostWithPagination();
     
      return { ...curState, ...someData };
    },
  };
  initStore(actions, {
    posts: [],
    articles:[]
  });
};
export default postsStore;
