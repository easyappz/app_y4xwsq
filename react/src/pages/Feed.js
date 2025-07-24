import React, { useState, useEffect, useCallback } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getPosts } from '../api/posts';
import PostCard from '../components/PostCard';
import CreatePostForm from '../components/CreatePostForm';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await getPosts(page);
      const newPosts = response.data;
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(newPosts.length > 0);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Не удалось загрузить посты. Пожалуйста, попробуйте позже.');
    } finally {
      setLoading(false);
    }
  }, [page, loading]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
    );
  };

  const handlePostDeleted = (deletedPostId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== deletedPostId));
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <CreatePostForm onPostCreated={handlePostCreated} />
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={<CircularProgress />}
        endMessage={<Typography textAlign="center">Больше постов нет</Typography>}
      >
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onUpdate={handlePostUpdated}
            onDelete={handlePostDeleted}
          />
        ))}
      </InfiniteScroll>
    </Box>
  );
};

export default Feed;
