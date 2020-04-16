import axios from 'axios';


 const isAuthonticated = () =>{
    return axios.get('http://localhost:3000/users/verifytoken',
    {
        headers:{
        Authorization:localStorage.getItem("token")
    }
    }).then(results=>{
        if(results.data.value){
            return true;
        }
        return false
    });
}
export default isAuthonticated;