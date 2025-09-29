import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner } from '@heroui/react'
import React, { useState } from 'react'
import { deleteCommentApi } from '../services/CommentServices'

export default function DropDownComment({commentId, callback}) {
    const [loading, setloading] = useState(false)

    async function deleteComment(commentId) {
        setloading(true)

        const response=await deleteCommentApi(commentId);
        if (response.message) {
            await callback()
            
        }
       
        setloading(false)
        
    }
  return (
    <>


{
    loading?<Spinner/> :


    
             <Dropdown>
      <DropdownTrigger>
        <svg
              className="w-16 outline-0 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="27"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#b0b0b0"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
       
        <DropdownItem key="edit">Edit </DropdownItem>
        <DropdownItem
        
        onClick={()=>deleteComment(commentId)}
        key="delete" className="text-danger" color="danger">
          Delete 
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
              
}
    
    
      
    </>
  )
}
