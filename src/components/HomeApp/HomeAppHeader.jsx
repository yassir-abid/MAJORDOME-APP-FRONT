/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Link } from 'react-router-dom';

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

import Avatar from '../Avatar/Avatar';

function HomeAppHeader() {
  const avatar = localStorage.getItem('avatar');
  const firstname = localStorage.getItem('pseudo');

  return (
    <Box>
      <Box
        sx={{
          zIndex: 1,
          position: 'absolute',
          top: '0%',
          left: '10',
          p: 0.8,
        }}
      >
        <Link to="/Profile">
          <Avatar avatar={avatar} firstname={firstname} />
        </Link>
      </Box>
      <Box sx={{
        bgcolor: 'primary.main',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomLeftRadius: '17px',
        borderBottomRightRadius: '17px',
        height: 60,
        pt: 1,
        // p: 1,
      }}
      >
        <Typography variant="h4" gutterBottom component="div" sx={{ color: 'white' }}>
          Majordome
        </Typography>
      </Box>
    </Box>
  );
}

export default HomeAppHeader;
