/* eslint-disable react/no-unescaped-entities */

// import dependencies
import { React, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';

// import MUI
import { Dialog, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ButtonGroup from '@mui/material/ButtonGroup';
import Modal from '@mui/material/Modal';

// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';

// import projet
import ListProjets from './ListProjets';
// import Avatar from '../Avatar/Avatar';
// import './style.scss';

function Client() {
  const [value, setValue] = useState('');

  // récupère l'id de la route
  const { id } = useParams();

  // edit client
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [street, setStreet] = useState('');
  const [comments, setComments] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [clientComments, setClientComments] = useState('');
  const [addressId, setAddressId] = useState('');
  const [secondaryText, setSecondaryText] = useState(false);

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
      console.log('#client#');
      console.log(response.data);
      setInfos(response.data);
      console.log(infos);
      // edit client
      setFirstname(response.data.firstname);
      setLastname(response.data.lastname);
      setPhone(response.data.phone);
      setEmail(response.data.email);
      setNumber(response.data.addresses[0].number);
      setStreet(response.data.addresses[0].street);
      setComments(response.data.addresses[0].comments);
      setPostalCode(response.data.addresses[0].postal_code);
      setCity(response.data.addresses[0].city);
      setAddressId(response.data.addresses[0].id);
      setClientComments(response.data.comments);
      if (!response.data.comments) {
        setSecondaryText(true);
      }
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

  //   // gestion du switch : readonly false or true
  //   const [editMode, setEditMode] = useState(false);
  //   const switchChange = (event) => {
  //     setEditMode(event.target.checked);
  //   };

  // modal to update client
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const navigate = useNavigate();

  // function to edit one client witch his id
  const editClient = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`https://majordome-api.herokuapp.com/api/clients/${id}`, {
        client: {
          firstname,
          lastname,
          email,
          phone,
          comments: clientComments,
        },
        addresses: [{
          id: addressId,
          number,
          street,
          postal_code: postalCode,
          city,
          comments,
        }],
      }, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      navigate('/clients');
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  // function to delete one client with his id
  function clientDelete() {
    if (window.confirm('Etes vous sur de vouloir supprimer ce client ?')) {
      navigate('/clients');
      const clientToDelete = async () => {
        try {
          const response = await axios.delete(`https://majordome-api.herokuapp.com/api/clients/${id}`, {
            headers: {
              Authorization: `bearer ${token}`,
            },
          });
          // console.log(response);
          setInfos(response.data);
        } catch (error) {
          console.log('Erreur de chargement', error);
        }
      };

      clientToDelete();
    }
  }

  if (!infos) {
    return null;
  }

  return (
    <Box>
      <Box>
        <Box
          sx={{
            // zIndex: 1,
            // position: 'absolute',
            // top: '0%',
            // left: '10',
            // p: 0.8,
          }}
        >
          {/* <Link to="/Profile">
          <Avatar avatar={avatar} firstname={firstname} />
        </Link> */}
        </Box>
        <Box sx={{
          bgcolor: 'primary.main',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomLeftRadius: '17px',
          borderBottomRightRadius: '17px',
          height: 60,
          pl: 1,
          pr: 1,
          pt: 1,
          // p: 1,
        }}
        >
          <Fab size="small" color="secondary" aria-label="edit">
            <DeleteIcon onClick={() => clientDelete(infos.id)} />
          </Fab>
          {/* <Icon icon="ri:delete-bin-2-fill" width="30" height="30" /> */}

          <Typography variant="h5" gutterBottom component="div" sx={{ color: 'white' }}>
            {infos.lastname} {infos.firstname}
          </Typography>
          <Fab size="small" color="secondary" aria-label="edit">
            <EditIcon onClick={handleOpenModal} />
          </Fab>
          {/* <Icon icon="bxs:edit-alt" width="30" height="30"/> */}

        </Box>
      </Box>

      <Box>
        <Box
          component="form"
          sx={{
            m: 1,
          }}
          noValidate
          autoComplete="off"
        >
          <ListItem
            sx={{
              mb: 1,
              borderRadius: '5px',
              border: 1,
              boxShadow: 3,
              borderColor: 'primary.light',
              bgcolor: 'white',
            }}
          >
            <ListItemText
              primary={infos.lastname}
            />
          </ListItem>
          <ListItem
            sx={{
              mb: 1,
              borderRadius: '5px',
              border: 1,
              boxShadow: 3,
              borderColor: 'primary.light',
              bgcolor: 'white',
            }}
          >
            <ListItemText
              primary={infos.firstname}
            />
          </ListItem>
          <ListItem
            sx={{
              mb: 1,
              borderRadius: '5px',
              border: 1,
              boxShadow: 3,
              borderColor: 'primary.light',
              bgcolor: 'white',
            }}
          >
            <ListItemText
              primary={infos.phone}
            />
          </ListItem>
          <ListItem
            sx={{
              mb: 2,
              borderRadius: '5px',
              border: 1,
              boxShadow: 3,
              borderColor: 'primary.light',
              bgcolor: 'white',
            }}
          >
            <ListItemText
              primary={infos.email}
            />
          </ListItem>

          {/* récupération des adresses */}
          <List>
            {infos.addresses.map((info, index) => (
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  height: '100%',
                },
              }}
              >
                <Typography>Adresse {index + 1} :</Typography>
                <ListItem
                  key={info.id}
                  sx={{
                    mb: 1,
                    borderRadius: '5px',
                    border: 1,
                    boxShadow: 3,
                    borderColor: 'primary.light',
                    bgcolor: 'white',
                  }}
                >
                  <ListItemText
                    primary={`${info.number} ${info.street}`}
                    secondary={info.comments}
                  />
                </ListItem>
                {/* <TextField
                      fullWidth
                      id="comments"
                      placeholder="Complément d'adresse"
                    // fullWidth
                      multiline
                      maxRows={4}
                      value={info.comments}
                      onChange={handleChange}
                    /> */}
                <ListItem
                  key={info.id}
                  sx={{
                    mb: 1,
                    borderRadius: '5px',
                    border: 1,
                    boxShadow: 3,
                    borderColor: 'primary.light',
                    bgcolor: 'white',
                  }}
                >
                  <ListItemText
                    primary={info.postal_code}
                  />
                </ListItem>
                <ListItem
                  key={info.id}
                  sx={{
                    mb: 2,
                    borderRadius: '5px',
                    border: 1,
                    boxShadow: 3,
                    borderColor: 'primary.light',
                    bgcolor: 'white',
                  }}
                >
                  <ListItemText
                    primary={infos.addresses[0].city}
                  />
                </ListItem>

                <Box>
                  <Typography>Commentaire :</Typography>
                  <ListItem
                    key={infos.comments}
                    sx={{
                      mb: 1,
                      borderRadius: '5px',
                      border: 1,
                      boxShadow: 3,
                      borderColor: 'primary.light',
                      bgcolor: 'white',
                    }}
                  >
                    <ListItemText
                      primary={infos.comments ? `${infos.comments}` : null}
                      secondary={secondaryText ? 'Aucun commentaire pour ce client' : null}
                    />
                  </ListItem>
                  {/* <TextField
                    sx={{ mb: 2 }}
                    fullWidth
                    id="comments"
                    label=""
                    placeholder="Notes"
                    multiline
                    maxRows={4}
                    value={infos.comments}
                  /> */}
                </Box>
              </Box>
            ))}
          </List>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              '& > *': {
                m: 1,
              },
            }}
          >
            <ButtonGroup variant="text" size="small">
              {/* créer ou vérifier les liens de chaque boutons */}
              {/* <Link to={`/documents/clients/${id}`}> */}
              <Button href={`/documents/clients/${id}`} color="secondary" variant="contained">Documents</Button>
              {/* </Link> */}
              <Button href={`/clients/${id}/equipments`} color="secondary" variant="contained">
                équipements <br />& besoins
              </Button>
              <Button href="/projects" color="secondary" variant="contained">Ajout <br />Projets</Button>
            </ButtonGroup>

          </Box>
        </Box>

        <Box>
          <Typography
            sx={{ m: 1 }}
            variant="h6"
            gutterBottom
            component="div"
          >Listes des projets du client :
          </Typography>
          { infos.projects.length > 0
            ? (
              <ListProjets projects={infos.projects} />
            )
            : (
              <Typography
                sx={{ m: 1, fontStyle: 'italic' }}
                variant="h8"
                gutterBottom
                component="div"
              >Aucun projet lié à ce client
              </Typography>
            )}
        </Box>
      </Box>
      {/* modal to edit client */}
      <Box
        sx={{
          // maxHeight: '100%',
        }}
      >
        <Dialog
          fullScreen
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            // height: `calc(100vh - ${64}px)`,
            width: '100%',
            // m: 32,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '0%',
              left: '50%',
              // m: 0,
              transform: 'translate(-50%, 0%)',
              // // // minWidth: 1,
              width: 500,
              maxWidth: '100%',
              // // height: '100vh',
              p: 1,
              bgcolor: 'background.default',
            }}
          >
            <Typography>Modification du client {infos.firstname} {infos.lastname}</Typography>
            <form onSubmit={editClient}>
              <TextField
                sx={{ mb: 1 }}
                id="lastName"
                name="lastname"
                label="Nom"
                value={lastname}
                placeholder="Nom"
                onChange={(event) => setLastname(event.target.value)}
              />
              <TextField
                sx={{ mt: 1, mb: 1 }}
                id="firstName"
                name="firstname"
                label="Prénom"
                value={firstname}
                placeholder="Prénom"
                onChange={(event) => setFirstname(event.target.value)}
              />
              <TextField
                sx={{ mb: 1 }}
                id="phone"
                name="phone"
                label="tel"
                value={phone}
                placeholder="Numéro"
                onChange={(event) => setPhone(event.target.value)}
              />
              <TextField
                sx={{ mb: 1 }}
                id="email"
                name="email"
                label="email"
                value={email}
                placeholder="Email"
                fullWidth
                onChange={(event) => setEmail(event.target.value)}
              />

              {/* <p className="client-detail_adresse">Adresse {index + 1}</p> */}
              <div>
                <TextField
                  sx={{ mb: 1 }}
                  id="number"
                  name="number"
                  label="numéro"
                  value={number}
                  placeholder="Numéro"
                  size=""
                  onChange={(event) => setNumber(event.target.value)}
                />
                <TextField
                  sx={{ mb: 1 }}
                  id="street"
                  name="street"
                  label="rue"
                  multiline
                  maxRows={4}
                  value={street}
                  placeholder="Rue"
                  onChange={(event) => setStreet(event.target.value)}
                />
                <TextField
                  sx={{ mb: 1 }}
                  fullWidth
                  id="comments"
                  name="comments"
                  placeholder="Complément d'adresse"
                    // fullWidth
                  label="complément d'adresse"
                  multiline
                  maxRows={4}
                  value={comments}
                  onChange={(event) => setComments(event.target.value)}
                />
                <TextField
                  sx={{ mb: 1 }}
                  id="postal_code"
                  name="postal_code"
                  label="cp"
                // eslint-disable-next-line camelcase
                  value={postalCode}
                  placeholder="Code postal"
                  onChange={(event) => setPostalCode(event.target.value)}
                />
                <TextField
                  sx={{ mb: 2 }}
                  id="city"
                  name="city"
                  label="ville"
                  value={city}
                  placeholder="Ville"
                  onChange={(event) => setCity(event.target.value)}
                />
                {/* <TextField
                name="id"
                label="addresses_id"
                value={addressId}
                placeholder="Ville"
                onChange={(event) => setAddressId(event.target.value)}
              /> */}
              </div>

              {/* <p>Commentaire</p> */}
              <TextField
                sx={{ mb: 1 }}
                fullWidth
                id="comments"
                name="comments"
                label="détails client"
                placeholder="Notes"
                multiline
                maxRows={4}
                value={clientComments}
                onChange={(event) => setClientComments(event.target.value)}
              />
              <TextField
                sx={{
                  mb: 1,
                  bgcolor: 'primary.light',
                  borderRadius: '5px',
                }}
                fullWidth
                type="submit"
                value="Valider"
                defaultValue="Envoyer"
              />
            </form>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <IconButton>
                <CancelIcon fontSize="large" color="secondary" onClick={handleCloseModal}> </CancelIcon>
              </IconButton>
            </Box>
          </Box>
        </Dialog>
      </Box>

    </Box>
  );
}

export default Client;
