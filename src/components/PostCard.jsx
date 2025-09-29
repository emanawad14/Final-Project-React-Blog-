import React, { useContext, useState } from 'react'
import PostHeader from './Card/PostHeader'
import PostBody from './Card/PostBody'
import PostFooter from './Card/PostFooter'
import Comments from './Comments'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@heroui/react'
import { createCimmentApi, getPostCommentApi } from '../services/CommentServices'
import { AuthContext } from '../Context/AuthContext'
import DropDownComment from './DropDownComment'


export default function PostCard({post ,commentLimit ,callback}) {

 const {userData} =useContext(AuthContext)

  const [commentContent, setCommentContent] = useState('')
  const [isloading, setisloading] = useState(false)

  async function createComment(e) {
    setisloading(true)
    e.preventDefault();
    const response=await createCimmentApi(commentContent, post.id)
    console.log(commentContent);
    if (response.message) {
     await  callback();
     setCommentContent('')
    }
    
    setisloading(false)
   

    
  }

  async function getPostComments() {
    const response=await getPostCommentApi(post.id);
    setCommentContent(response.comments)
    
  }
  
  
  return (
    <div>
      
        <div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5 overflow-hidden"> 
          <div className="w-full  h-16 flex items-center justify-between">
          <PostHeader  photo={post.user.photo}  name={post.user.name} data={post.createdAt}/>
           
           {
            userData._id === post.user._id &&


             <>


                 <DropDownComment />
              

             
             
             </>

           


           }

          </div>

        
        <PostBody   body={post.body}   image={post.image}/>


      <PostFooter
      postId={post.id}
      commentNumber={post.comments.length}/>


      <form   onSubmit={createComment} className='flex gap-3 mb-4'>

        <Input
        
         value={commentContent}
         onChange={(e)=>setCommentContent(e.target.value)}
        variant='bordered' placeholder='comment.....' />
        <Button
       
    isLoading={isloading}
        type='submit'
        disabled={commentContent.length<2} color='primary'>
          Add Comment
        </Button>
      </form>
       
       {
        post.comments.length>0 &&   
        post.comments.slice(0,commentLimit).map((comment)=>
         <Comments comment={comment}
           callback={getPostComments}
        postUserId={post.user._id}
         key={comment._id }
         />
        )
        
       
      
        


       }
        
        </div>

        
        
    </div>
  )
}
