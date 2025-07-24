import React, { useState } from 'react';
import { Card, CardContent, CardActions, Typography, IconButton, TextField, Button } from '@mui/material';
import { ThumbUp, Edit, Delete } from '@mui/icons-material';
import { updatePost, deletePost } from '../api/posts';

const PostCard = ({ post, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);

  const handleEdit = async () => {
    if (isEditing) {
      try {
        const response = await updatePost(post._id, { content: editContent });
        onUpdate(response.data);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating post:', error);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(post._id);
      onDelete(post._id);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        {isEditing ? (
          <TextField
            fullWidth
            multiline
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
        ) : (
          <Typography variant="body1">{post.content}</Typography>
        )}
        <Typography variant="caption" color="text.secondary">
          {new Date(post.createdAt).toLocaleString()}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="like">
          <ThumbUp />
        </IconButton>
        <IconButton aria-label="edit" onClick={handleEdit}>
          <Edit />
        </IconButton>
        <IconButton aria-label="delete" onClick={handleDelete}>
          <Delete />
        </IconButton>
        {isEditing && (
          <Button size="small" onClick={handleEdit}>
            Сохранить
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default PostCard;
