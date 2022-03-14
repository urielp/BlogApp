import * as React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import PostItem from "../postItem/postItem";
import { useStoreAsyncVersion } from "../../../stores/store";
import rtlStyle from "../../../assets/jss/material-dashboard-react/views/rtlStyle";
import { container } from "../../../assets/jss/material-dashboard-react";
import { test } from "../postItem/justFortest";
// import LoadinSpinner from '../../loadingSpinner/loadingSpinner';
// import Skeleton from '@mui/material/Skeleton'
import PostSkeletonItem from '../postSkeleton/postSkeleton';
export interface postProps {
  posts: any[];
}
const styles = createStyles({
  ...rtlStyle,
  container: {
    ...container,
    zIndex: 2,
    position: "relative",
    paddingTop: "20vh",
    color: "#FFFFFF",
    paddingBottom: "200px",
  },
});

const PostsList = (props: any) => {

  const [myStoreTest,dispatchTest] =useStoreAsyncVersion(true)
  const StateAsync = useStoreAsyncVersion(true)[0];
  const { classes } = props;
  const myTest = test;
  const doSometing = React.useCallback(myTest, []);
  const [currentPage,setCurrentPage] = React.useState(0);

  React.useEffect( () => {
    const fetchPosts = async ()=>{
      await  dispatchTest('GET_POSTS',{}) 
      await dispatchTest('GET_POST_PAGINATION',{});
      
    }
     fetchPosts();
  }, []);

  React.useEffect(()=>{
     const fetchByPage = async()=>{
      await dispatchTest('GET_POST_PAGINATION',{page:currentPage});
     }
     fetchByPage();
    
  },[currentPage])

  const handelChange =async (event:any,value:any) =>{
    setCurrentPage(value-1)
  }
  const itemSkeleton = () =>{
    return (
      <div>
        <PostSkeletonItem/>
        <PostSkeletonItem/>
        <PostSkeletonItem/>
        </div>
    );
  }
  const listComp = () =>{
    return (     
      <div>
      {
      StateAsync.articles.map((v: any, key: any) => {
        return (
          <div key={key}>
            <PostItem post={v}  someTest={doSometing} />
          </div>    
      );
    })} 
    </div>
    )
  }
  return (
    <div>
      {
        StateAsync.articles.length=== 0 ? itemSkeleton():listComp()
      }
    </div>
  );
};
export default withStyles(styles)(PostsList);
