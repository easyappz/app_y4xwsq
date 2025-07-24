import instance from './axios';

export const getPosts = (page = 1, limit = 10) => {
  return instance.get(`/api/posts?page=${page}&limit=${limit}`);
};

export const createPost = (postData) => {
  return instance.post('/api/posts', postData);
};

export const updatePost = (postId, postData) => {
  return instance.put(`/api/posts/${postId}`, postData);
};

export const deletePost = (postId) => {
  return instance.delete(`/api/posts/${postId}`);
};
