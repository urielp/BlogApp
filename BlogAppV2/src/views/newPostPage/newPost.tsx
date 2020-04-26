import * as React from "react";
import NewPostForm from "../../components/posts/postForm/newPost";
export const NewPostsPage = (props: any) => {
  console.log(props);
  return (
    <div>
      <NewPostForm history={props.history} />
    </div>
  );
};
