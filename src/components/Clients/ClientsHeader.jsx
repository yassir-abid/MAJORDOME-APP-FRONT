/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Link } from 'react-router-dom';

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

import Avatar from '../Avatar/Avatar';

function ClientsHeader() {
  const avatar = localStorage.getItem('avatar');
  const firstname = localStorage.getItem('pseudo');

  return (
    <Box sx={{
      bgcolor: 'primary.main',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      borderBottomLeftRadius: '17px',
      borderBottomRightRadius: '17px',
      height: 60,
      p: 1,
      // FIXME: gérer le titre en center et l'avatar en start (left)
    }}
    >
      {/* <Box>
        <Link to="/Profile">
          <Avatar />
        </Link>
      </Box> */}
      <Box>
        <Typography variant="h4" gutterBottom component="div" sx={{ color: 'white' }}>
          Contacts Clients
        </Typography>
      </Box>
    </Box>
  );
}

export default ClientsHeader;
