import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

function Equipments() {
  // equipments
  const [eqValue, setEqValue] = React.useState('');
  const handleEqChange = (event) => {
    setEqValue(event.target.value);
  };

  // needs
  const [bsnValue, setBsnValue] = React.useState('');
  const handleBsnChange = (event) => {
    setBsnValue(event.target.value);
  };

  return (
    <div>

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
          <Typography variant="h6" gutterBottom component="div" sx={{ color: 'white' }}>
            Équipements & Besoins
          </Typography>
        </Box>
      </Box>

      <div>
        <Box
          sx={{ m: 1 }}
        >
          <div>
            <TextField
              sx={{ mt: 4, mb: 1 }}
              id="Equipments"
              label="Équipements"
              multiline
              minRows={5}
              maxRows={10}
              value={eqValue}
              onChange={handleEqChange}
              fullWidth
            />
            <TextField
              sx={{ mb: 1 }}
              id="Besoins"
              label="Besoins"
              multiline
              minRows={5}
              maxRows={10}
              value={bsnValue}
              onChange={handleBsnChange}
              fullWidth
            />
          </div>
        </Box>
      </div>
    </div>

  );
}

export default Equipments;
