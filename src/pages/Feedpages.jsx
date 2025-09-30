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




















// import { useEffect, useState } from 'react'
// import PostCard from '../components/PostCard'
// import { getAllPosts } from '../services/PostServices';
// import LoadingScreen from '../components/LoadingScreen';
// import { useNavigate } from 'react-router-dom';
// import AddPosts from './AddPosts';

// export default function Feedpages() {
//   const [posts, setPosts] = useState([]);
//   const [showAddPost, setShowAddPost] = useState(false); // 👈 للتحكم في الفورم

//   async function getAllPostsApi() {
//     const response = await getAllPosts();
//     setPosts(response?.posts || []);
//   }

//   useEffect(() => {
//     getAllPostsApi();
//   }, []);

//   return (
//     <div className="relative min-h-screen">
//       <div className="w-4/6 mx-auto pb-20">
//         {posts.length === 0 ? (
//           <LoadingScreen />
//         ) : (
//           posts.map((post) => (
//             <PostCard
//               key={post.id}
//               commentLimit={1}
//               callback={getAllPostsApi}
//               post={post}
//             />
//           ))
//         )}
//       </div>

//       {/* لو عاوز AddPosts يبقى Modal أو Popup */}
//       {showAddPost && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white rounded-lg shadow-lg p-5 w-1/2">
//             <AddPosts callback={getAllPostsApi} />
//             <button
//               onClick={() => setShowAddPost(false)}
//               className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* زرار + عائم */}
//       <button
//         onClick={() => setShowAddPost(true)} // 👈 يفتح الفورم بدل الـ navigate
//         className="fixed cursor-pointer bottom-6 right-6 bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl shadow-lg hover:bg-blue-700 transition"
//       >
//         +
//       </button>
//     </div>
//   );
// }
