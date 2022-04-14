/* eslint-disable camelcase */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { changeValue, addClient } from '../../actions/addClient';
import ClientsHeader from './ClientsHeader';
import List from './List';
import './clients.scss';

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

  return (
    <div className="clients">
      <ClientsHeader />
      <div className="clients-main">
        <div>
          <TextField
            className="clients-searchBar"
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            label="Search"
          />
        </div>
        <List input={inputText} />
        <div className="clients-addClient">
          <Icon onClick={handleOpen} icon="ph:user-circle-plus" width="40" />
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
          className="style"
        >
          <form
            onSubmit={handleSubmit}
            className="detailClients"
          >
            <h1>formulaire ajout d'un client</h1>
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
    </div>
  );
}

export default Clients;
