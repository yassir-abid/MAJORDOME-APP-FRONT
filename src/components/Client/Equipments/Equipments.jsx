import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import ClientHeader from '../ClientHeader';
import '../style.scss';

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
      <ClientHeader />
      <div>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="Equipments"
              label="Équipements"
              multiline
              minRows={4}
              maxRows={10}
              value={eqValue}
              onChange={handleEqChange}
              fullWidth
            />
            <TextField
              id="Besoins"
              label="Besoins"
              multiline
              minRows={4}
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
