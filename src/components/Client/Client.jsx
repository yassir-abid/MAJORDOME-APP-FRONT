/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import ClientHeader from './ClientHeader';
import ListProjets from './ListProjets';
import './style.scss';

function Client() {
  const [value, setValue] = React.useState('');
  const { id } = useParams();
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [comValue, setComValue] = React.useState('');
  const comHandleChange = (event) => {
    setComValue(event.target.value);
  };

  const [checked, setChecked] = React.useState(true);
  const switchChange = (event) => {
    setChecked(event.target.checked);
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
            id="phone"
            label="Téléphone"
            placeholder="Numéro"
            // defaultValue=""
            InputProps={{
              readOnly: false,
            }}
          />
          <FormControlLabel
            control={(
              <Switch
                checked={checked}
                onChange={switchChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            )}
            label="Edit"
            // labelPlacement="bottom"
          />

          {/* <a href="mailto:">mailto</a> */}
          <TextField
            className="client-detail_email"
            id="email"
            label="Email"
            placeholder="Email"
            // defaultValue="dédé@gmail.com"
            InputProps={{
              readOnly: false,
            }}
          />
          <p className="client-detail_adresse">Adresse</p>
          <div className="client-detail_adresse-div">
            <TextField
              sx={{ width: '10ch' }}
              id="number"
              label=""
              placeholder="Numéro"
              size=""
            />
            <TextField
              id="street"
              multiline
              maxRows={4}
              label=""
              placeholder="Rue"
            />
            <TextField
              fullWidth
              id="comments"
              placeholder="Complément d'adresse"
              // fullWidth
              multiline
              maxRows={4}
              value={value}
              onChange={handleChange}
            />
            <TextField
              id="postal_code"
              label=""
              placeholder="Code postal"
            />
            <TextField
              id="city"
              label=""
              placeholder="Ville"
            />
          </div>
          <p className="client-detail_com">Commentaire</p>
          <TextField
            fullWidth
            id="comments"
            label=""
            placeholder="Notes"
            multiline
            maxRows={4}
            value={comValue}
            onChange={comHandleChange}
          />
          <div className="client-detail_btn">
            <ButtonGroup variant="text" size="small">
              {/* TODO: styliser les boutons et les centrer */}
              {/* créer ou vérifier les liens de chaque boutons */}
              <Link to={`/clients/${id}/documents_list`}>
                <Button>Documents</Button>
              </Link>
              <Link to={`/clients/${id}/notifications_list`}>
                <Button>Notifs</Button>
              </Link>
              <Link to={`/clients/${id}/equipments`}>
                <Button>équipements <br />
                  & besoins
                </Button>
              </Link>
              {/* add modal sur btn "ajout projets" */}
              <Button color="success">Ajout <br />Projets
              </Button>
            </ButtonGroup>
          </div>
        </Box>

        <div className="client-list">
          <p>Listes des projets du client</p>
          <ListProjets />
        </div>

      </div>
    </div>
  );
}

export default Client;
