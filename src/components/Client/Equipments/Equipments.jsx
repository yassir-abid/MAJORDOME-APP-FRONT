import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

// import ClientHeader from '../ClientHeader';
// import '../style.scss';

function Equipments() {
  // équipements
  const [eqValue, setEqValue] = React.useState('');
  const handleEqChange = (event) => {
    setEqValue(event.target.value);
  };

  // besoins
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
      // FIXME: gérer le titre en center et l'avatar en start (left)
      }}
      >
        <Box>
          <Typography variant="h6" gutterBottom component="div" sx={{ color: 'white' }}>
            Équipements & Besoins
          </Typography>
        </Box>
      </Box>

      {/* <ClientHeader /> */}
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
