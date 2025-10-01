import React from 'react'

export default function PostBody({body , image}) {
  return (
    <div className="my-4">

     {body &&  <p className='mb-6 my-6'>{body}</p>}
         {image && <img src={image} className='w-full h-100 object-cover ' alt="" />}
      
    </div>
  )
}
