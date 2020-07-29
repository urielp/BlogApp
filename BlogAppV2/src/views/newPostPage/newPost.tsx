import * as React from "react";
import NewPostForm from "../../components/posts/postForm/newPost";
import NewPostFormX from "../../components/posts/postForm/newPostX";
export const NewPostsPage = (props: any) => {
  console.log(props);
  return (
    <div>
      {/* <NewPostForm history={props.history} /> */}
      <NewPostFormX history={props.history} />
    </div>
  );
};
