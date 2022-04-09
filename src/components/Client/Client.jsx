/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import ClientHeader from './ClientHeader';
import './style.scss';

function Client() {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [comValue, setComValue] = React.useState('');

  const comHandleChange = (event) => {
    setComValue(event.target.value);
  };

  return (
    <div className="client">
      <ClientHeader />
      <div className="client-detail">
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          {/* <a href="tel:0606060606">clic pour tel</a> //<==rendre le num dynamique ? */}
          <TextField
            className="client-detail_tel"
            id="outlined-read-only-input"
            label="Téléphone"
            placeholder="Numéro"
            defaultValue="0650567856"
            InputProps={{
              readOnly: false,
            }}
          />

          {/* <a href="mailto:">mailto</a> */}
          <TextField
            className="client-detail_email"
            id="outlined-read-only-input"
            label="Email"
            placeholder="Email"
            defaultValue="dédé@gmail.com"
            InputProps={{
              readOnly: true,
            }}
          />
          <p className="client-detail_adresse">Adresse</p>
          <div className="client-detail_adresse-div">
            <TextField
              sx={{ width: '10ch' }}
              id="outlined-read-only-input"
              label=""
              placeholder="Numéro"
              size=""
            />
            <TextField
              id="outlined-read-only-input"
              multiline
              maxRows={4}
              label=""
              placeholder="Rue"
            />
            <TextField
              fullWidth
              id="outlined-multiline-flexible"
              placeholder="Complément d'adresse"
              // fullWidth
              multiline
              maxRows={4}
              value={value}
              onChange={handleChange}
            />
            <TextField
              id="outlined-read-only-input"
              label=""
              placeholder="Code postal"
            />
            <TextField
              id="outlined-read-only-input"
              label=""
              placeholder="Ville"
            />
          </div>
          <p className="client-detail_com">Commentaire</p>
          <TextField
            fullWidth
            id="outlined-multiline-flexible-2"
            label="Commentaire"
            placeholder="Notes"
            multiline
            maxRows={4}
            value={comValue}
            onChange={comHandleChange}
          />
          <div className="client-detail_btn">
            <ButtonGroup fullWidth size="normal" color="error" variant="outlined" aria-label="small button group">
              <Button>Documents</Button>
              <Button>Notifs</Button>
              <Button>équipements <br />
                & besoins
              </Button>
            </ButtonGroup>
          </div>
        </Box>

        <div>
          <p>mettre en place un component list des projet d'intervention</p>
        </div>

      </div>
    </div>
  );
}

export default Client;
