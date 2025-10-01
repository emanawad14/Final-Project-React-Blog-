import { Button, Spinner, Textarea } from "@heroui/react";
import { useState } from "react";
import { createPostApi } from "../services/PostServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddPosts({ callback }) {
  const [postBody, setPostBody] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function createPost(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("body", postBody);
    formData.append("image", image);

    try {
      const response = await createPostApi(formData);

      if (response.message === "success") {
        toast.success(" Post added successfully");
        await callback();
        setPostBody("");
        setImageUrl("");
        navigate("/");
      } else {
        toast.error(" Failed to add post");
      }
    } catch (err) {
     
    }

    setLoading(false);
  }

  function handleImage(e) {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    e.target.value = "";
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-6 px-4 bg-gray-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8 md:p-10">
   
        <h2 className="text-3xl font-extrabold text-[#0f172a] mb-6 text-center">
          Add New Post ✨
        </h2>

      
        <form onSubmit={createPost} className="space-y-6 relative">
         
          <div>
            <label className="block text-[#0f172a] font-semibold mb-2">
              Description
            </label>
            <Textarea
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
              placeholder="What's on your mind?"
              minRows={4}
              className="border rounded-lg p-3 w-full"
            />
          </div>

         
          {imageUrl && (
            <div className="relative group">
              <img
                src={imageUrl}
                className="w-full object-cover rounded-lg border"
                alt="Preview"
              />
              <button
                type="button"
                onClick={() => setImageUrl("")}
                className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full shadow-md opacity-80 group-hover:opacity-100 transition"
              >
                ✕
              </button>
            </div>
          )}

          <div>
            <label className="cursor-pointer flex items-center  gap-3 text-[#0f172a] font-medium hover:text-[#1e293b] transition">
              <input
                type="file"
                className="hidden"
                onChange={handleImage}
                accept="image/*"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75 7.41 10.59a2.25 2.25 0 0 1 3.18 0l5.16 5.16m-1.5-1.5
                  1.41-1.41a2.25 2.25 0 0 1 3.18 0l2.91 2.91m-18 3.75h16.5a1.5
                  1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5
                  1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z"
                />
              </svg>
              <span>Upload Image</span>
            </label>
          </div>


          <div className="flex justify-center">
            <Button
              type="submit"
              className="px-40 py-4 rounded-lg font-semibold bg-[#0f172a] text-white hover:bg-[#1e293b] shadow-md transition"
            >
              {loading ? <Spinner color="white" size="sm" /> : "Add Post"}
            </Button>
          </div>

         
          {loading && (
            <div className="absolute flex justify-center items-center inset-0 bg-white/60 rounded-lg">
              <Spinner size="lg" color="primary" />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
