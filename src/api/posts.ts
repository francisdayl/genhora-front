import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
export const fetchPosts = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};
export const fetchPostById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    throw error;
  }
};
export const createPost = async (post: { title: string; body: string }) => {
  try {
    const response = await axiosInstance.post('/', post);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};
export const updatePost = async (
  id: number,
  post: { title: string; body: string }
) => {
  try {
    const response = await axiosInstance.put(`/${id}`, post);
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};
export const deletePost = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

export const fetchRelatedPosts = async (id: number) => {
  try {
    const postIds: number[] = [];
    const range = 4;
    for (let i = 1; i < range; i++) {
      if (id + i > 100) break;
      postIds.push(id + i);
    }
    if (id + range > 100) {
      for (let i = 1; i < range; i++) {
        postIds.push(id - i);
      }
    }
    const response = await axiosInstance.get(`/`);
    const relatedPosts = response.data.filter((post: { id: number }) =>
      postIds.includes(post.id)
    );
    return relatedPosts;
  } catch (error) {
    console.error('Error fetching related posts:', error);
    throw error;
  }
};
