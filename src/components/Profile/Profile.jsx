/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
// import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';
import ProfileHeader from './ProfileHeader';
import Avatar from './Avatar';
import './style.scss';

function Profile() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="profile">
      <ProfileHeader />
      <main className="profile-main">
        <button
          type="button"
          className="profile-params"
          // onClick={() => setModalVisibility(!modalVisibility)}
          onClick={handleOpen}
        >
          <div className="profile-Params_icon">
            <Icon
              icon="uiw:setting-o"
              color="black"
              width="50"
              height="50"
            />
          </div>
          <div className="profile-params_text">
            <p>Paramètres du profil</p>
          </div>
        </button>
        <div className="profile-deconnexion">
          {/* TODO: modifier la route du lien de déconnexion, pour le moment il renvoie sur "/" */}
          {/* <Link to="/"> */}
          <button type="button" className="btn">
            Déconnexion
          </button>
          {/* </Link> */}
        </div>
        <div>
          <Modal
            className="modal"
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              className="style"
            >
              <form
                className="detailClient"
              >
                <label>
                  <TextField sx={{ mt: 1, mb: 1 }} fullWidth label="Nom" type="text" name="firstName" value="toto" />
                </label>
                <label>
                  <TextField sx={{ mb: 1 }} fullWidth label="Prénom" type="text" name="lastName" value="replace *value* for dynamique info" />
                </label>
                <label>
                  <TextField sx={{ mb: 1 }} fullWidth label="Email" type="email" name="email" value="toto@gmail.com" />
                </label>
                <label>
                  <TextField sx={{ mb: 1 }} fullWidth label="Mot de passe" type="password" name="password" />
                </label>
                <label>
                  <TextField sx={{ mb: 1 }} fullWidth label="Téléphone" type="tel" name="phone" />
                </label>
                <label>
                  <TextField sx={{ mb: 1 }} fullWidth label="Numéro" type="text" name="adresse" />
                </label>
                <label>
                  <TextField sx={{ mb: 1 }} fullWidth label="Rue" type="text" name="adresse" />
                </label>
                <label>
                  <TextField sx={{ mb: 1 }} fullWidth label="Code postal" type="text" name="adresse" />
                </label>
                <label>
                  <TextField sx={{ mb: 1 }} fullWidth label="Ville" type="text" name="adresse" />
                </label>
                <TextField sx={{ mb: 1, bgcolor: 'text.disabled' }} fullWidth type="submit" value="Envoyer" />
              </form>
              <Button className="modal-close" onClick={handleClose}>close</Button>
            </Box>
          </Modal>
        </div>
      </main>
    </div>
  );
}

export default Profile;
