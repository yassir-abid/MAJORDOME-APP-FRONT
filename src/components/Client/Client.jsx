/* eslint-disable react/no-unescaped-entities */

// import dependencies
import { React, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

// import MUI
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

// import projet
import ClientHeader from './ClientHeader';
import ListProjets from './ListProjets';
import './style.scss';

function Client() {
  const [value, setValue] = useState('');

  // récupère l'id de la route
  const { id } = useParams();

  // params axios route GET
  const [infos, setInfos] = useState('');
  const token = localStorage.getItem('token');
  const infoClient = async () => {
    try {
      const response = await axios.get(`https://majordome-api.herokuapp.com/api/clients/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log(response.data);
      setInfos(response.data);
      console.log(infos);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };
  useEffect(() => {
    infoClient();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [comValue, setComValue] = useState('');
  const comHandleChange = (event) => {
    setComValue(event.target.value);
  };

  // gestion du switch : readonly false or true
  const [editMode, setEditMode] = useState(false);
  const switchChange = (event) => {
    setEditMode(event.target.checked);
  };

  if (!infos) {
    return null;
  }

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

          <FormControlLabel
            control={(
              <Switch
                checked={editMode}
                onChange={switchChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            )}
            label="Edit"
          />
          <TextField
            id="firstName"
            // label="Prénom"
            value={infos.firstname}
            placeholder="Prénom"
            // defaultValue=""
            InputProps={{
              readOnly: !editMode,
            }}
          />
          <TextField
            id="lastName"
            // label="Nom"
            value={infos.lastname}
            placeholder="Nom"
            // defaultValue=""
            InputProps={{
              readOnly: !editMode,
            }}
          />
          <TextField
            id="phone"
            // label="tel"
            value={infos.phone}
            placeholder="Numéro"
            // defaultValue=""
            InputProps={{
              readOnly: !editMode,
            }}
          />
          <TextField
            id="email"
            // label="email"
            value={infos.email}
            placeholder="Email"
            fullWidth
            InputProps={{
              readOnly: !editMode,
            }}
          />

          {infos.addresses.map((info, index) => (
            <ul>
              <li key={infos.id}>
                <p className="client-detail_adresse">Adresse {index + 1}</p>
                <div className="client-detail_adresse-div">
                  <TextField
                    sx={{ width: '10ch' }}
                    id="number"
                    // label="infos.number"
                    value={info.number}
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
                    value={info.street}
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
                    value={info.comments}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: !editMode,
                    }}
                  />
                  <TextField
                    id="postal_code"
                    label=""
                    value={info.postal_code}
                    placeholder="Code postal"
                    InputProps={{
                      readOnly: !editMode,
                    }}
                  />
                  <TextField
                    id="city"
                    label=""
                    // value={infos.addresses[0].city}
                    placeholder="Ville"
                    InputProps={{
                      readOnly: !editMode,
                    }}
                  />
                </div>
              </li>
            </ul>
          ))}

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
          <ListProjets projects={infos.projects} />
        </div>

      </div>
    </div>
  );
}

export default Client;
