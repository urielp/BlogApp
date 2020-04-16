import * as React from "react";
import PostItem from "../postItem/postItem";

"reactstrap";

export interface postProps {
  posts: any[];
}

export const PostsList = (props: any) => {
  React.useEffect(() => {
    console.log(props.posts);
  }, [props.posts]);
  return (
    <div>
      <h1>Posts List</h1>
      {props.posts.map((v: any, key: any) => {
        return <PostItem post={v} key={key} />;
      })}
    </div>
  );
};
