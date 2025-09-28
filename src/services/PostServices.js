import axios from "axios";


  export async function getAllPosts() {

   
    try {

         const {data}=await axios.get(`https://linked-posts.routemisr.com/posts?limit=50`,
        {
            headers:{
                token: localStorage.getItem('token')
            }
        }

       
        
    )
     console.log(data);
     return data
        
    } catch (error) {
        console.log(error);
        
        
    }
    
 }