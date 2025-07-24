import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { createPost } from '../api/posts';

const CreatePostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createPost({ content });
      onPostCreated(response.data);
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <TextField
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        placeholder="Что у вас нового?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Опубликовать
      </Button>
    </Box>
  );
};

export default CreatePostForm;
