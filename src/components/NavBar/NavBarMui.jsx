import * as React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Typography from '@mui/material/Typography';
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
          height: 65,
        }}
      >
        <Container maxWidth="md">
          <Toolbar
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <NavLink to="/home-app">
              <IconButton
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                color="inherit"
                aria-label="open drawer"
              >
                <HomeIcon fontSize="large" />
                <Typography sx={{ fontSize: 8 }}>Accueil</Typography>
              </IconButton>
            </NavLink>
            <NavLink to="/clients">
              <IconButton
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                color="inherit"
                aria-label="open drawer"
              >
                <GroupAddIcon fontSize="large" />
                <Typography sx={{ fontSize: 8 }}>Clients</Typography>
              </IconButton>
            </NavLink>
            <NavLink to="/schedule">
              <IconButton
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                color="inherit"
                aria-label="open drawer"
              >
                <CalendarTodayIcon fontSize="large" />
                <Typography sx={{ fontSize: 8 }}>Agenda</Typography>
              </IconButton>
            </NavLink>
            <NavLink to="/documents">
              <IconButton
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                color="inherit"
                aria-label="open drawer"
              >
                <NoteAddIcon fontSize="large" />
                <Typography sx={{ fontSize: 8 }}>Docs</Typography>
              </IconButton>
            </NavLink>
            <NavLink to="/projects">
              <IconButton
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                color="inherit"
                aria-label="open drawer"
              >
                <EngineeringIcon fontSize="large" />
                <Typography sx={{ fontSize: 8 }}>Projets</Typography>
              </IconButton>
            </NavLink>
            <NavLink to="/interventions">
              <IconButton
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                color="inherit"
                aria-label="open drawer"
              >
                <HandymanIcon fontSize="large" />
                <Typography sx={{ fontSize: 8 }}>Intervention</Typography>
              </IconButton>
            </NavLink>
          </Toolbar>
        </Container>
      </AppBar>
    </Container>
  );
}
