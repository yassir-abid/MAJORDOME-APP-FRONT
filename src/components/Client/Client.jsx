/* eslint-disable react/no-unescaped-entities */

import { React, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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

import ListProjets from './ListProjets';
import baseUrl from '../../utils';

function Client() {
  const { id } = useParams();

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

  const [infos, setInfos] = useState('');
  const token = localStorage.getItem('token');
  const infoClient = async () => {
    try {
      const response = await axios.get(`${baseUrl}/clients/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      setInfos(response.data);
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

  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const navigate = useNavigate();

  const editClient = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`${baseUrl}/clients/${id}`, {
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

  function clientDelete() {
    if (window.confirm('Etes vous sur de vouloir supprimer ce client ?')) {
      navigate('/clients');
      const clientToDelete = async () => {
        try {
          const response = await axios.delete(`${baseUrl}/clients/${id}`, {
            headers: {
              Authorization: `bearer ${token}`,
            },
          });
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
        }}
        >
          <Fab size="small" color="secondary" aria-label="edit">
            <DeleteIcon onClick={() => clientDelete(infos.id)} />
          </Fab>

          <Typography variant="h5" gutterBottom component="div" sx={{ color: 'white' }}>
            {infos.lastname} {infos.firstname}
          </Typography>
          <Fab size="small" color="secondary" aria-label="edit">
            <EditIcon onClick={handleOpenModal} />
          </Fab>

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
              <Button href={`/documents/clients/${id}`} color="secondary" variant="contained">Documents</Button>
              <Button href={`/clients/${id}/equipments`} color="secondary" variant="contained">
                Equipements <br />& besoins
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

      <Box>
        <Dialog
          fullScreen
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            width: '100%',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '0%',
              left: '50%',
              transform: 'translate(-50%, 0%)',
              width: '100%',
              height: 'auto',
              minHeight: '100vh',
              p: 1,
              bgcolor: 'background.default',
            }}
          >
            <form onSubmit={editClient}>
              <Typography variant="h5">Modification du client {infos.firstname} {infos.lastname}</Typography>
              <TextField
                sx={{ mt: 3, mb: 1 }}
                id="lastName"
                name="lastname"
                label="Nom"
                value={lastname}
                placeholder="Nom"
                fullWidth
                onChange={(event) => setLastname(event.target.value)}
              />
              <TextField
                sx={{ mb: 1 }}
                id="firstName"
                name="firstname"
                label="Prénom"
                value={firstname}
                placeholder="Prénom"
                fullWidth
                onChange={(event) => setFirstname(event.target.value)}
              />
              <TextField
                sx={{ mb: 1 }}
                id="phone"
                name="phone"
                label="tel"
                value={phone}
                placeholder="Numéro"
                fullWidth
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

              <TextField
                sx={{ mb: 1 }}
                id="number"
                name="number"
                label="numéro"
                value={number}
                placeholder="Numéro"
                fullWidth
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
                fullWidth
                onChange={(event) => setStreet(event.target.value)}
              />
              <TextField
                sx={{ mb: 1 }}
                id="comments"
                name="comments"
                placeholder="Complément d'adresse"
                label="complément d'adresse"
                multiline
                fullWidth
                maxRows={4}
                value={comments}
                onChange={(event) => setComments(event.target.value)}
              />
              <TextField
                sx={{ mb: 1 }}
                id="postal_code"
                name="postal_code"
                label="cp"
                value={postalCode}
                placeholder="Code postal"
                fullWidth
                onChange={(event) => setPostalCode(event.target.value)}
              />
              <TextField
                sx={{ mb: 2 }}
                id="city"
                name="city"
                label="ville"
                value={city}
                placeholder="Ville"
                fullWidth
                onChange={(event) => setCity(event.target.value)}
              />

              <TextField
                sx={{ mb: 1 }}
                id="comments"
                name="comments"
                label="détails client"
                placeholder="Notes"
                multiline
                fullWidth
                maxRows={4}
                value={clientComments}
                onChange={(event) => setClientComments(event.target.value)}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <TextField
                  sx={{
                    mb: 1,
                    mt: 1,
                    bgcolor: 'primary.light',
                    borderRadius: '5px',
                    width: 500,
                    maxWidth: '100%',
                  }}
                  fullWidth
                  type="submit"
                  value="Valider"
                  defaultValue="Envoyer"
                />
              </Box>
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
