import * as React from "react";
import Pagination from '@mui/material/Pagination'
import withStyles from '@material-ui/core/styles/withStyles';
import GridItem from "../Grid/GridItem";
import { createStyles } from '@material-ui/core';
import Stack from '@mui/material/Stack'
import { useStoreAsyncVersion } from "../../stores/store";

const style = createStyles({
  grid: {
    padding: '0 15px !important'
  }
});
const PaginationBar = (props: any) => {
    const [myStoreTest,dispatchTest] =useStoreAsyncVersion(true)
    const [currentPage,setCurrentPage] = React.useState(0);
    const StateAsync = useStoreAsyncVersion(true)[0];

    React.useEffect( () => {
        const fetchPosts = async ()=>{
          await dispatchTest('GET_POST_PAGINATION',{});
        }
        fetchPosts();
    }, []);
    
    React.useEffect( () => {
        const fetchByPage = async()=>{
        await dispatchTest('GET_POST_PAGINATION',{page:currentPage});
       }
        fetchByPage();
   
    },[currentPage])
 
    const handelChange =async (event:any,value:any) =>{
        setCurrentPage(value-1)
    }
    
    return(
        <div> 
        <Stack spacing={2} >
        <GridItem xs={12} sm={12} md={12}>
          <Pagination count={StateAsync.totalPages} onChange={handelChange} color="secondary"/>
          </GridItem>
        </Stack>
      </div>
    )
}
export default withStyles(style)(PaginationBar);
