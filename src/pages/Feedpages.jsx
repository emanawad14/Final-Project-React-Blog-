import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import { getAllPosts } from '../services/PostServices';
import LoadingScreen from '../components/LoadingScreen';
import { useNavigate } from 'react-router-dom';
import AddPosts from './AddPosts';

export default function Feedpages() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); // 👈

  async function getAllPostsApi() {
    const response = await getAllPosts();
    setPosts(response.posts || []);
  }

  useEffect(() => {
    getAllPostsApi();
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="w-4/6 mx-auto pb-20">

      {/* <AddPosts  callback={getAllPostsApi}/> */}
        {posts.length === 0 ? (
          <LoadingScreen />
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} commentLimit={1}
            callback={getAllPostsApi}
            post={post} />
          ))
        )}
      </div>

      {/* زرار + عائم */}
      <button
        onClick={() => navigate('/addpost')} // 👈 يوديك على صفحة الإضافة
        className="fixed cursor-pointer bottom-6 right-6 bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl shadow-lg hover:bg-blue-700 transition"
      >
        +
      </button>
    </div>
  );
}
