import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1>404 - Not Found</h1>
      <p>
        The page you are looking for does not exist. Go back to the{' '}
        <Link to="/">home page</Link>.
      </p>
    </div>
  );
}
