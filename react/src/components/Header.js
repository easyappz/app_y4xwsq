import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          ВКонтакте
        </Typography>
        <Box>
          {user ? (
            <>
              <Button color="inherit" component={Link} to={`/profile/${user._id}`}>
                {user.username}
              </Button>
              <Button color="inherit" onClick={logout}>Выйти</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Войти</Button>
              <Button color="inherit" component={Link} to="/register">Регистрация</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;