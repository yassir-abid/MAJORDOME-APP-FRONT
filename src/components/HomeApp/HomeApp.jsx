import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import HomeAppHeader from './HomeAppHeader';

import ListInterventions from './ListInterventions';
import './style.scss';

function HomeApp() {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  return (
  // <Container disableGutters="false" maxWidth="md">
    <Box
      sx={{
        overflow: 'hidden',
        bgcolor: 'background.default',
        height: '90%',
      }}
    >
      <HomeAppHeader />
      {/* FIXME: gérer soucis de hauteur avec scroll */}
      <Box sx={{ textAlign: 'center', overflow: 'scroll', height: '90%' }}>
        <Box>
          <Typography variant="h6" gutterBottom component="div">
            {' '}
            {dateState.toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </Typography>
          <Typography>
            {dateState.toLocaleString('fr-FR', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: false,
            })}
          </Typography>
        </Box>
        <Typography color="secondary" sx={{ textAlign: 'center' }} variant="h5" gutterBottom component="div">
          Interventions du jour
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <ListInterventions />
        </Box>
      </Box>
    </Box>
  // </Container>
  );
}

export default HomeApp;
