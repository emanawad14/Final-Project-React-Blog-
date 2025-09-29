import { Button, Spinner, Textarea } from '@heroui/react'
import { useState } from 'react'
import { createPostApi } from '../services/PostServices';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function AddPosts({ callback }) {

  const [postBody, setPostBody] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function createPost(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('body', postBody);
    formData.append('image', image);

    try {
      const response = await createPostApi(formData);

      if (response.message === "success") {
        toast.success("Post added successfully ");

        await callback();
        setPostBody('');
        setImageUrl('');

        
        navigate('/');
      } else {
        toast.error("Failed to add post");
      }
    } catch (err) {
     
    }

    setLoading(false);
  }

  function handleImage(e) {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    e.target.value = '';
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-5 px-4">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Post
        </h2>

        <div className='bg-white relative rounded-md shadow-md py-3 px-3 my-5 overflow-hidden'>
          <form onSubmit={createPost} className="space-y-6">
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Description
              </label>
              <Textarea
                value={postBody}
                onChange={(e) => setPostBody(e.target.value)}
                placeholder="Enter description"
                minRows={4}
                fullWidth
              />
            </div>

            {imageUrl &&
              <div className="relative">
                <img src={imageUrl} className="w-full object-cover rounded-md" alt="Preview" />
                <svg
                  onClick={() => setImageUrl('')}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 absolute top-4 right-4 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
            }

            <div>
              <label className="cursor-pointer hover:text-blue-500 flex items-center gap-3">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImage}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
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
              <Button type='submit' color="primary" className="px-20 py-2 rounded-md shadow-md">
                Add Post
              </Button>
            </div>
          </form>

          {loading &&
            <div className='absolute flex justify-center items-center inset-0 bg-white/50'>
              <Spinner />
            </div>
          }

        </div>
      </div>
    </div>
  )
}
