import { Button } from '@heroui/react'
import React, { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import { getAllPosts } from '../services/PostServices';
import LoadingScreen from '../components/LoadingScreen';

export default function Feedpages() {
  const [posts, setPosts] = useState([]);

  async function getAllPostsApi() {
    const response = await getAllPosts();
    setPosts(response.posts || []);
  }

  useEffect(() => {
    getAllPostsApi();
  }, []);

  return (
    <div>
      <div className="w-4/6 mx-auto">
        {posts.length ==0 ?<LoadingScreen/> :    posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
