/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import { React, useState } from 'react';
import { Icon } from '@iconify/react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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
            className="detailClients"
          >
            <label>
              <TextField sx={{ mt: 1, mb: 1 }} fullWidth label="Nom" type="text" name="firstName" defaultValue="toto" />
            </label>
            <label>
              <TextField sx={{ mb: 1 }} fullWidth label="Prénom" type="text" name="lastName" defaultValue="replace *defaultValue* for dynamique info" />
            </label>
            <label>
              <TextField sx={{ mb: 1 }} fullWidth label="Email" type="email" name="email" defaultValue="toto@gmail.com" />
            </label>
            <label>
              <TextField sx={{ mb: 1 }} fullWidth label="Téléphone" type="tel" name="phone" defaultValue="" />
            </label>
            <label>
              <TextField sx={{ mb: 1 }} fullWidth label="Numéro" type="text" name="adresse" defaultValue="" />
            </label>
            <label>
              <TextField sx={{ mb: 1 }} fullWidth label="Rue" type="text" name="adresse" defaultValue="" />
            </label>
            <label>
              <TextField sx={{ mb: 1 }} fullWidth label="Code postal" type="text" name="adresse" defaultValue="" />
            </label>
            <label>
              <TextField sx={{ mb: 1 }} fullWidth label="Ville" type="text" name="adresse" defaultValue="" />
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
