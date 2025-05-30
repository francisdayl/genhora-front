import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPostById, fetchRelatedPosts } from '../../api/posts';
import PostCard from '../../components/PostCard';
import { Post } from '../../schemas/post';

export default function PostDetailPage() {
  const params = useParams();
  const postId = params.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPostById(Number(postId)),
  });

  const {
    data: relatedPostsData,
    isLoading: relatedPostsLoading,
    isError: relatedPostsError,
  } = useQuery({
    queryKey: ['relatedPosts', postId],
    queryFn: () => fetchRelatedPosts(Number(postId)),
    enabled: !!data,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading post</div>;
  if (!data) return <div>Post not found</div>;

  return (
    <div>
      <h1 className="text-3xl">Post Detail</h1>
      <div className="flex flex-col items-center my-8">
        <PostCard post={data} showLink={false} />
      </div>

      <h2 className="text-3xl font-semibold mb-4">Related Posts</h2>
      <div
        data-testid="related-posts-container"
        className="flex flex-row flex-wrap gap-4 justify-evenly"
      >
        {relatedPostsLoading && <div>Loading related posts...</div>}
        {relatedPostsError && <div>Error loading related posts</div>}
        {relatedPostsData &&
          relatedPostsData.map((post: Post) => (
            <PostCard post={post} key={post.id} />
          ))}
      </div>
    </div>
  );
}
