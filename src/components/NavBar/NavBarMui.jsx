import * as React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import HandymanIcon from '@mui/icons-material/Handyman';
import EngineeringIcon from '@mui/icons-material/Engineering';

// const StyledFab = styled(Fab)({
//   position: 'absolute',
//   zIndex: 1,
//   top: -30,
//   left: 0,
//   right: 0,
//   margin: '0 auto',
// });

export default function BottomAppBar() {
  return (

    <Container maxWidth="md">
      <AppBar
        position="fixed"
        color="primary"
        sx={{
          borderTopLeftRadius: '17px',
          borderTopRightRadius: '17px',
          top: 'auto',
          bottom: 0,
        }}
      >
        <Container maxWidth="md">
          <Toolbar
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <NavLink to="/home-app">
              <IconButton color="inherit" aria-label="open drawer">
                <HomeIcon />
              </IconButton>
            </NavLink>
            <NavLink to="/clients">
              <IconButton color="inherit" aria-label="open drawer">
                <GroupAddIcon />
              </IconButton>
            </NavLink>
            <NavLink to="/schedule">
              <IconButton color="inherit">
                <CalendarTodayIcon />
              </IconButton>
            </NavLink>
            <NavLink to="/documents">
              <IconButton color="inherit">
                <NoteAddIcon />
              </IconButton>
            </NavLink>
            <NavLink to="/projects">
              <IconButton color="inherit">
                <EngineeringIcon />
              </IconButton>
            </NavLink>
            <NavLink to="/interventions">
              <IconButton color="inherit">
                <HandymanIcon />
              </IconButton>
            </NavLink>
          </Toolbar>
        </Container>
      </AppBar>
    </Container>
  );
}
