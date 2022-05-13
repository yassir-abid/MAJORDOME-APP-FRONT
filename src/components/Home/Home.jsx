import React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import './style.scss';
import logo from '../../assets/butler.png';

function Home() {
  return (
    <Box
      sx={{ bgcolor: 'white', height: '100vh' }}
    >
      <Box
        sx={{ }}
      >
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img className="home-header_logo-1" src={logo} alt="Logo" />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            fontStyle: 'italic',
          }}
        >
          <Typography variant="h4" component="div" gutterBottom>Majordome !</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          mt: 2,
          mr: 4,
          mb: 6,
          ml: 4,
        }}
      >
        <Paper elevation={3}>
          <Typography
            sx={{
              p: 2,
            }}
          >
            <Typography fontSize="20px" fontStyle="italic" fontWeight="bold">
              Majordome,
            </Typography>
            C’est un outil de gestion d’activité,
            un assistant personnel à destination des auto-entrepreneurs,
            artisans où toutes personnes travaillant seules de manière itinérante.
            Majordome va vous aider à organiser votre journée, ranger vos documents,
            gérer vos clients, votre activité et vos interventions.
          </Typography>
        </Paper>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Stack spacing={2} direction="row">
          <Link to="/login">
            <Button type="button" color="primary" variant="contained">
              Connexion
            </Button>
          </Link>
          <Link to="/signup">
            <Button type="button" color="primary" variant="contained">
              Inscription
            </Button>
          </Link>
        </Stack>
      </Box>
    </Box>
  );
}

export default Home;
