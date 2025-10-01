
import React, { useContext } from "react";
import PostHeader from "./Card/PostHeader";
import { AuthContext } from "../Context/AuthContext";
import DropDownComment from "./DropDownComment";

export default function Comments({ comment, postUserId, callback }) {
  const { userData } = useContext(AuthContext);

  return (
    <div className="p-4 bg-gray-100 -mx-3 -mb-3">
      <div className="w-full flex items-center justify-between">
        <PostHeader
          photo={comment.commentCreator.photo}
          name={comment.commentCreator.name}
          data={comment.createdAt}
        />

        {userData._id === comment.commentCreator._id && (
          <DropDownComment commentId={comment._id} callback={callback} />
        )}
      </div>
      <p className="p-2 pb-4">{comment.content}</p>
    </div>
  );
}
