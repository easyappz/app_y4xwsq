import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Avatar, Grid, Paper, Button, TextField, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getUserProfile, updateUserProfile, getCurrentUser } from '../api/profileApi';

const ProfilePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(20),
  height: theme.spacing(20),
  marginBottom: theme.spacing(2),
}));

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile(id);
        setProfile(response.data);
        const currentUserResponse = await getCurrentUser();
        setIsCurrentUser(currentUserResponse.data._id === response.data._id);
        setEditedProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await updateUserProfile(profile._id, editedProfile);
      setProfile(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  if (!profile) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <ProfilePaper>
          <LargeAvatar src={profile.avatar} alt={profile.username} />
          {isEditing ? (
            <TextField
              fullWidth
              name="avatar"
              label="Avatar URL"
              value={editedProfile.avatar}
              onChange={handleChange}
              margin="normal"
            />
          ) : null}
          <Typography variant="h4">{profile.username}</Typography>
          {isEditing ? (
            <TextField
              fullWidth
              name="username"
              label="Username"
              value={editedProfile.username}
              onChange={handleChange}
              margin="normal"
            />
          ) : null}
          <Typography variant="body1">{profile.email}</Typography>
          {isEditing ? (
            <TextField
              fullWidth
              name="email"
              label="Email"
              value={editedProfile.email}
              onChange={handleChange}
              margin="normal"
            />
          ) : null}
          {isCurrentUser && (
            <Button
              variant="contained"
              color="primary"
              onClick={isEditing ? handleSave : handleEdit}
              sx={{ mt: 2 }}
            >
              {isEditing ? 'Сохранить' : 'Редактировать'}
            </Button>
          )}
        </ProfilePaper>
      </Grid>
      <Grid item xs={12} md={8}>
        <ProfilePaper>
          <Typography variant="h6">О себе</Typography>
          {isEditing ? (
            <TextField
              fullWidth
              name="bio"
              label="О себе"
              value={editedProfile.bio}
              onChange={handleChange}
              multiline
              rows={4}
              margin="normal"
            />
          ) : (
            <Typography>{profile.bio}</Typography>
          )}
        </ProfilePaper>
        <ProfilePaper>
          <Typography variant="h6">Друзья</Typography>
          <List>
            {/* Здесь должен быть список друзей, но так как у нас нет данных о друзьях, оставим его пустым */}
            <ListItem>
              <Typography>Список друзей пока пуст</Typography>
            </ListItem>
          </List>
        </ProfilePaper>
      </Grid>
    </Grid>
  );
};

export default Profile;