import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ВКонтакте
        </Typography>
        <Button color="inherit" component={Link} to="/">Главная</Button>
        <Button color="inherit" component={Link} to="/feed">Лента</Button>
        <Button color="inherit" component={Link} to="/profile">Профиль</Button>
        <Button color="inherit" component={Link} to="/login">Вход</Button>
        <Button color="inherit" component={Link} to="/register">Регистрация</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
