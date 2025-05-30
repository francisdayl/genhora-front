import { useState, useEffect } from 'react';
import { fetchPosts } from '../../api/posts';
import PostCard from '../../components/PostCard';
import { Post } from '../../schemas/post';

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getPosts();
  }, []);

  return (
    <>
      <div
        data-testid="posts-container"
        className="px-4 py-8 flex flex-row gap-4 flex-wrap flex-items-center justify-center"
      >
        {posts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
