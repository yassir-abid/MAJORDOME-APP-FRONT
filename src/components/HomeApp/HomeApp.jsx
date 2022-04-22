import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import HomeAppHeader from './HomeAppHeader';

import ListInterventions from './ListInterventions';
// import './style.scss';

function HomeApp() {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  return (
    <>
      {/* <CssBaseline /> */}

      <Box
        sx={{
          overflow: 'hidden',
          bgcolor: 'background.default',
          height: '100vh',
          pb: '145px',
        }}
      >
        <HomeAppHeader />
        <Box sx={{
          textAlign: 'center',
          overflowY: 'hidden',
          height: 'inherit',
          pb: '145px',
        }}
        >
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
          <Box sx={{ textAlign: 'center', height: '80%', overflowY: 'auto' }}>
            <ListInterventions />
          </Box>
        </Box>
      </Box>

    </>
  );
}

export default HomeApp;
