import { Link } from 'react-router-dom';
import { Post } from '../schemas/post';

interface PostCardProps {
  post: Post;
  showLink?: boolean;
}

export default function PostCard({ post, showLink = true }: PostCardProps) {
  return (
    <div
      data-testid={`post-card-${post.id}`}
      className="border-2 border-white rounded-lg mb-4 md:w-120 py-4 px-2"
    >
      <h2 className="text-2xl font-bold text-center">{post.title}</h2>
      <p className="post-body">{post.body}</p>
      {showLink && (
        <Link to={`/posts/${post.id}`} className="hover:text-xl">
          Read more
        </Link>
      )}
    </div>
  );
}
