/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import Fab from '@mui/material/Fab';

import { changeValue, addClient } from '../../actions/addClient';
import ClientsHeader from './ClientsHeader';
import ListClients from './ListClients';
import baseUrl from '../../utils';

function Clients() {
  const [inputText, setInputText] = useState('');

  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const [clients, setClients] = useState([]);
  const token = localStorage.getItem('token');
  const loadData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/clients`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      setClients(response.data);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addClientToState = (client) => {
    setClients([...clients, client]);
    handleClose();
  };

  const {
    firstname, lastname, email, phone, number, street,
    postal_code, city, addressComments,
  } = useSelector((state) => state.addClient);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(changeValue(e.target.value, e.target.name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addClient(addClientToState));
  };

  const StyledFab = styled(Fab)({
    position: 'fixed',
    zIndex: 1,
    bottom: 80,
    right: 25,
    margin: '0 auto',
  });

  return (
    <Box>
      <ClientsHeader />
      <div>
        <Box
          sx={{
            mt: 2,
            ml: 1,
            mr: 1,

          }}
        >
          <TextField
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            label="Search"
          />
        </Box>
        <ListClients input={inputText} clients={clients} />
        <div>
          <StyledFab size="medium" color="secondary" aria-label="add">
            <AddIcon onClick={handleOpen} />
          </StyledFab>
        </div>
      </div>
      <Box
        sx={{
          maxHeight: '100%',
        }}
      >
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ height: '100vh' }}
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
            <form
              onSubmit={handleSubmit}
            >
              <Typography variant="h5">
                Nouveau client
              </Typography>
              <label>
                <TextField
                  sx={{ mt: 3, mb: 1 }}
                  id="a"
                  fullWidth
                  label="Prénom"
                  type="text"
                  name="firstname"
                  value={firstname}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                <TextField
                  sx={{ mb: 1 }}
                  id="b"
                  fullWidth
                  label="Nom"
                  type="text"
                  name="lastname"
                  value={lastname}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                <TextField
                  sx={{ mb: 1 }}
                  fullWidth
                  label="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                <TextField
                  sx={{ mb: 1 }}
                  fullWidth
                  label="Téléphone"
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                <TextField
                  sx={{ mb: 1 }}
                  fullWidth
                  label="Numéro"
                  type="text"
                  name="number"
                  value={number}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                <TextField
                  sx={{ mb: 1 }}
                  fullWidth
                  label="Rue"
                  type="text"
                  name="street"
                  value={street}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                <TextField
                  sx={{ mb: 1 }}
                  fullWidth
                  label="Code postal"
                  type="text"
                  name="postal_code"
                  value={postal_code}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                <TextField
                  sx={{ mb: 1 }}
                  fullWidth
                  label="Ville"
                  type="text"
                  name="city"
                  value={city}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                <TextField
                  sx={{ mb: 1 }}
                  fullWidth
                  label="Complément"
                  type="text"
                  name="addressComments"
                  value={addressComments}
                  onChange={handleChange}
                />
              </label>
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
                <CancelIcon fontSize="large" color="secondary" onClick={handleClose}> </CancelIcon>
              </IconButton>
            </Box>
          </Box>
        </Dialog>
      </Box>
    </Box>
  );
}

export default Clients;
