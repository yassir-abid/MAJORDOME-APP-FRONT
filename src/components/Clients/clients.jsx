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
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

import { changeValue, addClient } from '../../actions/addClient';
import ClientsHeader from './ClientsHeader';
import List from './ListClients';
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

  const StyledFab = styled(Fab)({
    position: 'fixed',
    zIndex: 1,
    bottom: 70,
    right: 25,
    margin: '0 auto',
  });

  return (
    <Box
      sx={{
        // FIXME: régler la taille
        height: '100vh',
      }}
      className="clients"
    >
      <ClientsHeader />
      <div className="clients-main">
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
        <List input={inputText} />
        <div className="clients-addClient">
          <StyledFab size="medium" color="primary" aria-label="add">
            <AddIcon onClick={handleOpen} />
          </StyledFab>
        </div>
      </div>
      <Modal
        className="modal-clients"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            p: 1,
            bgcolor: 'background.default',
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="detailClients"
          >
            <Typography variant="h5">
              formulaire ajout d'un client
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
            <TextField sx={{ mb: 1, bgcolor: 'text.disabled' }} fullWidth type="submit" defaultValue="Envoyer" />
          </form>
          <Button className="modal-close1" onClick={handleClose}>close</Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default Clients;
