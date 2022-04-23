/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';

import { changeValue } from '../../actions/password';
import ProfileHeader from './ProfileHeader';
import './profilStyle.scss';

function Profile() {
  // modal to update client
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  // params axios route GET
  const [data, setData] = useState('');
  const [id, setId] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const token = localStorage.getItem('token');

  const loadProfil = async () => {
    try {
      const response = await axios.get('https://majordome-api.herokuapp.com/api/profile', {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log(response.data);
      setData(response.data);
      setFirstname(response.data.firstname);
      setLastname(response.data.lastname);
      setEmail(response.data.email);
      setPhone(response.data.phone);
      setId(response.data.id);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  const navigate = useNavigate();

  // function to delete one project with his id
  function avatarProfileDelete() {
    if (window.confirm('Etes vous sur de vouloir supprimer ce projet ?')) {
      const interventionToDelete = async () => {
        try {
          const response = await axios.delete('https://majordome-api.herokuapp.com/api/profile', {
            headers: {
              Authorization: `bearer ${token}`,
            },
          });
          navigate('/profile');
        } catch (error) {
          console.log('Erreur de chargement', error);
        }
      };

      interventionToDelete();
    }
  }

  const editProfile = async (event) => {
    event.preventDefault();
    try {
      await axios.patch('https://majordome-api.herokuapp.com/api/profile', {
        firstname,
        lastname,
        email,
        phone,
      }, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      navigate('/profile');
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  const deleteProfile = async () => {
    if (window.confirm('Etês-vous sûr de vouloir supprimer ce compte ? Toutes les informations liées à ce compte seront perdues !')) {
      const profileToDelete = async () => {
        try {
          const response = await axios.delete('https://majordome-api.herokuapp.com/api/profile', {
            headers: {
              Authorization: `bearer ${token}`,
            },
          });
          navigate('/');
        } catch (error) {
          console.log('Erreur de chargement', error);
        }
      };

      profileToDelete();
    }
  };

  const dispatch = useDispatch();

  const handleChangePassword = () => {
    dispatch(changeValue(id, 'id'));
    navigate('/newpassword');
  }

  useEffect(() => {
    loadProfil();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="profile">
      <ProfileHeader />
      <main className="profile-main">
        <Box
          component="form"
          // noValidate
          // autoComplete="off"
        >
          <form>
            <TextField
              sx={{ mt: 1, mb: 1 }}
              fullWidth
              id="firstName"
              name="firstname"
              label="Prénom"
              value={firstname}
            />

            <TextField sx={{ mb: 1 }} fullWidth label="Nom" type="text" name="lastName" value={lastname} />

            <TextField sx={{ mb: 1 }} fullWidth label="Email" type="email" name="email" value={email} />

            <TextField sx={{ mb: 1 }} fullWidth label="Téléphone" type="tel" name="phone" value={phone} />
          </form>
        </Box>
        <div>
          <Button variant="contained" onClick={handleOpenModal}>Modifier</Button>
        </div>

        <div className="profile-deconnexion">
          {/* TODO: modifier la route du lien de déconnexion, pour le moment il renvoie sur "/" */}
          <Link to="/">
            <button type="button" className="btn">
              Déconnexion
            </button>
          </Link>
        </div>
        <div>
          <Button onClick={handleChangePassword}> Réinitialiser le mot de passe</Button>
        </div>
        <div>
          <Button onClick={deleteProfile}>supprimer le compte ?</Button>
        </div>
        <div>
          {/* modal to edit client */}
          <Modal
            className=""
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              className="profile__modal"
            >
              <h1 className="profile__modal__title">Modification du profil </h1>
              <form className="profile__edit" onSubmit={editProfile}>
                <TextField
                  id="firstName"
                  name="firstname"
                  label="Prénom"
                  value={firstname}
                  placeholder="Prénom"
                  onChange={(event) => setFirstname(event.target.value)}
                />
                <TextField
                  id="lastName"
                  name="lastname"
                  label="Nom"
                  value={lastname}
                  placeholder="Nom"
                  onChange={(event) => setLastname(event.target.value)}
                />
                <TextField
                  id="phone"
                  name="phone"
                  label="tel"
                  value={phone}
                  placeholder="Numéro"
                  onChange={(event) => setPhone(event.target.value)}
                />
                <TextField
                  id="email"
                  name="email"
                  label="email"
                  value={email}
                  placeholder="Email"
                  fullWidth
                  onChange={(event) => setEmail(event.target.value)}
                />
                <TextField sx={{ m: 1, bgcolor: 'text.disabled' }} fullWidth onClick={handleCloseModal} type="submit" defaultValue="Envoyer" />
              </form>
              <Button className="modal-close1" onClick={handleCloseModal}>Fermer</Button>
            </Box>
          </Modal>
        </div>
      </main>
    </div>
  );
}

export default Profile;
