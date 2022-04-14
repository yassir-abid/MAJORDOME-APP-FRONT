/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
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

  useEffect(() => {
    // dispatch du fetch du client avec l'id ${id}
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [comValue, setComValue] = React.useState('');
  const comHandleChange = (event) => {
    setComValue(event.target.value);
  };

  const [editMode, setEditMode] = React.useState(false);
  const switchChange = (event) => {
    setEditMode(event.target.checked);
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
        ><FormControlLabel
          control={(
            <Switch
              checked={editMode}
              onChange={switchChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            )}
          label="Edit"
        />
          {/* <a href="tel:0606060606">clic pour tel</a> //<==rendre le num dynamique ? */}
          <TextField
            id="firstName"
            label="Prénom"
            placeholder="Prénom"
            // defaultValue=""
            InputProps={{
              readOnly: !editMode,
            }}
          />
          <TextField
            id="lastName"
            label="Nom"
            placeholder="Nom"
            // defaultValue=""
            InputProps={{
              readOnly: !editMode,
            }}
          />
          <TextField
            id="phone"
            label="Téléphone"
            placeholder="Numéro"
            // defaultValue=""
            InputProps={{
              readOnly: !editMode,
            }}
          />

          {/* <a href="mailto:">mailto</a> */}
          <TextField
            id="email"
            label="Email"
            placeholder="Email"
            // defaultValue="dédé@gmail.com"
            InputProps={{
              readOnly: !editMode,
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
              InputProps={{
                readOnly: !editMode,
              }}
            />
            <TextField
              id="street"
              multiline
              maxRows={4}
              label=""
              placeholder="Rue"
              InputProps={{
                readOnly: !editMode,
              }}
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
              InputProps={{
                readOnly: !editMode,
              }}
            />
            <TextField
              id="postal_code"
              label=""
              placeholder="Code postal"
              InputProps={{
                readOnly: !editMode,
              }}
            />
            <TextField
              id="city"
              label=""
              placeholder="Ville"
              InputProps={{
                readOnly: !editMode,
              }}
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
