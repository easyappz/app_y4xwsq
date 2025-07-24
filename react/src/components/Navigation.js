import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import FeedIcon from '@mui/icons-material/Feed';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const { user } = useAuth();

  return (
    <List component="nav">
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Главная" />
      </ListItem>
      {user && (
        <>
          <ListItem button component={Link} to={`/profile/${user._id}`}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Мой профиль" />
          </ListItem>
          <ListItem button component={Link} to="/feed">
            <ListItemIcon>
              <FeedIcon />
            </ListItemIcon>
            <ListItemText primary="Новости" />
          </ListItem>
        </>
      )}
    </List>
  );
};

export default Navigation;