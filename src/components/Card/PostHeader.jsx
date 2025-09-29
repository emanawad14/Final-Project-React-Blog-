import React from 'react'

export default function PostHeader({photo, name,data}) {
  return (
    <div className="flex">
              <img
              onError={(e)=>e.target.src='../../public/5272f686-52f0-41d1-bff8-b629a4bc42cc.jpg'}
                className="rounded-full w-10 h-10 mr-3"
                src={photo}
                alt={name}
              />
              <div>
                <h3 className="text-md font-semibold">{name}</h3>
                <p className="text-xs text-gray-500">{data.split('.',1).join().replace('T',' ')}</p>
              </div>
            </div>
  )
}
