
import React, { useContext, useState } from "react";
import PostHeader from "./Card/PostHeader";
import PostBody from "./Card/PostBody";
import PostFooter from "./Card/PostFooter";
import Comments from "./Comments";
import { Button, Input, Textarea } from "@heroui/react";
import {
  createCimmentApi,
  getPostCommentApi,
} from "../services/CommentServices";
import { AuthContext } from "../Context/AuthContext";
import { deletePostApi, updatePostApi } from "../services/PostServices";
import DropDownPost from "./DropDownPosts";
import toast from "react-hot-toast";

export default function PostCard({ post, commentLimit, callback }) {
  const { userData } = useContext(AuthContext);

  const [commentContent, setCommentContent] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [comments, setComments] = useState(post.comments || []);

  const [isEditing, setIsEditing] = useState(false);
  const [editBody, setEditBody] = useState(post.body);
  const [editImage, setEditImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(post.image);
  const [editLoading, setEditLoading] = useState(false);

  async function createComment(e) {
    e.preventDefault();
    setIsloading(true);
    const response = await createCimmentApi(commentContent, post.id);
    if (response.message === "success") {
      await getPostComments();
      setCommentContent("");
    }
    setIsloading(false);
  }

  async function getPostComments() {
    const response = await getPostCommentApi(post.id);
    if (response.message === "success") {
      setComments(response.comments);
    }
  }

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    const response = await deletePostApi(post.id);
    if (response.message === "success") {
      toast.success("Post deleted successfully");
      await callback();
    } else {
      toast.error("Failed to delete post");
    }
  }

  async function saveEdit() {
    setEditLoading(true);
    const formData = new FormData();
    formData.append("body", editBody);
    if (editImage) formData.append("image", editImage);

    const response = await updatePostApi(post.id, formData);
    if (response.message === "success") {
      toast.success("Post updated successfully");
      setIsEditing(false);
      await callback();
    } else {
      toast.error("Failed to update post");
    }
    setEditLoading(false);
  }

  return (
    <div className="bg-white sm:4/6 md:w-full  rounded-md shadow-md py-3 px-3 my-5">
      
      <div className="flex items-center justify-between">
        <PostHeader
          photo={post.user.photo}
          name={post.user.name}
          data={post.createdAt}
        />

        {userData._id === post.user._id && (
          <DropDownPost
            onEdit={() => setIsEditing(true)}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Body */}
      {isEditing ? (
        <div className="space-y-3">
          <Textarea
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            minRows={3}
          />

          {previewImage && (
            <div className="relative">
              <img src={previewImage} className="rounded-md" alt="Preview" />
              <svg
                onClick={() => {
                  setPreviewImage(null);
                  setEditImage(null);
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 absolute top-2 right-2 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}

          <input
            type="file"
            onChange={(e) => {
              setEditImage(e.target.files[0]);
              setPreviewImage(URL.createObjectURL(e.target.files[0]));
            }}
          />

          <div className="flex gap-2">
            <Button onClick={saveEdit} isLoading={editLoading} color="primary">
              Save
            </Button>
            <Button
              variant="flat"
              color="danger"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <PostBody body={post.body} image={post.image} />
      )}

      {/* Footer */}
      <PostFooter postId={post.id} commentNumber={comments.length} />

      {/* Comments */}
      <form onSubmit={createComment} className="flex gap-3 mb-4">
        <Input
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          variant="bordered"
          placeholder="comment..."
        />
        <Button
          isLoading={isloading}
          type="submit"
          disabled={commentContent.length < 2}
          color="primary"
        >
          Add Comment
        </Button>
      </form>

      {comments.length > 0 &&
        comments.slice(0, commentLimit).map((comment) => (
          <Comments
            key={comment._id}
            comment={comment}
            postUserId={post.user._id}
            callback={getPostComments}
          />
        ))}
    </div>
  );
}
