/* eslint-disable camelcase */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import Fab from '@mui/material/Fab';

import { changeValue, addClient } from '../../actions/addClient';
import ClientsHeader from './ClientsHeader';
import ListClients from './ListClients';
// import './clients.scss';

function Clients() {
  const [inputText, setInputText] = useState('');

  const inputHandler = (e) => {
    // convert input text to lower case
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    firstname, lastname, email, phone, number, street,
    postal_code, city, addressComments, clientComments,
  } = useSelector((state) => state.addClient);

  // const {
  //   firstname, lastname, email, phone, number, street, postal_code, city, comments,
  // } = useSelector((state) => state.project);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(changeValue(e.target.value, e.target.name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addClient());
  };

  // code pour le + violet
  const StyledFab = styled(Fab)({
    position: 'fixed',
    zIndex: 1,
    bottom: 80,
    right: 25,
    margin: '0 auto',
  });

  return (
    <Box
      sx={{
        // height: '100vh',
        // width: '100%',
      }}
    >
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
        <ListClients input={inputText} />
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
              // minWidth: 1,
              width: 500,
              maxWidth: '100%',
              height: '100vh',
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
                  sx={{ mt: 1, mb: 1 }}
                  id="a"
                  fullWidth
                  label="Nom"
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
                  label="Prénom"
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
