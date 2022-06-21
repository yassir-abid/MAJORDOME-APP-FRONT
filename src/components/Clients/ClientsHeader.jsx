/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

function ClientsHeader() {
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
    }}
    >
      <Box>
        <Typography variant="h4" gutterBottom component="div" sx={{ color: 'white' }}>
          Contacts Clients
        </Typography>
      </Box>
    </Box>
  );
}

export default ClientsHeader;
