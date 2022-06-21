/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import { Dialog } from '@material-ui/core';

import { changeValue } from '../../actions/password';
import { logout } from '../../actions/signUp';
import ProfileHeader from './ProfileHeader';

function Profile() {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

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
      handleCloseModal();
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  const deleteProfile = async () => {
    if (window.confirm('Etês-vous sûr de vouloir supprimer ce compte ? Toutes les informations liées à ce compte seront perdues !')) {
      const profileToDelete = async () => {
        try {
          axios.delete('https://majordome-api.herokuapp.com/api/profile', {
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
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    loadProfil();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItem: 'center',
        mt: 3,
        ml: 1,
        mr: 1,
        height: '100vh',
      }}
    >
      <ProfileHeader />
      <main>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            '& > :not(style)': {
              mb: 1,
              height: '100%',
            },
          }}
        >
          <ListItem
            sx={{
              mt: 4,
              borderRadius: '5px',
              border: 1,
              boxShadow: 3,
              borderColor: 'primary.light',
              bgcolor: 'white',
            }}
          >
            <ListItemText
              primary={lastname}
            />
          </ListItem>
          <ListItem
            sx={{
              borderRadius: '5px',
              border: 1,
              boxShadow: 3,
              borderColor: 'primary.light',
              bgcolor: 'white',
            }}
          >
            <ListItemText
              primary={firstname}
            />
          </ListItem>
          <ListItem
            sx={{
              borderRadius: '5px',
              border: 1,
              boxShadow: 3,
              borderColor: 'primary.light',
              bgcolor: 'white',
            }}
          >
            <ListItemText
              primary={email}
            />
          </ListItem>
          <ListItem
            sx={{
              mb: 3,
              borderRadius: '5px',
              border: 1,
              boxShadow: 3,
              borderColor: 'primary.light',
              bgcolor: 'white',
            }}
          >
            {phone && (
              <ListItemText
                primary={phone}
              />
            )}
            {!phone && (
            <ListItemText
              secondary="Tel"
            />
            )}
          </ListItem>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                mt: 2,
              }}
            >
              <Button variant="contained" onClick={handleOpenModal}>Modifier</Button>
            </Box>
            <Box
              sx={{
                mt: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Link to="/">
                  <Button type="button" color="secondary" variant="outlined" onClick={handleLogout}>
                    Déconnexion
                  </Button>
                </Link>
              </Box>
              <Box>
                <Button onClick={handleChangePassword}>Réinitialiser le mot de passe</Button>
              </Box>
              <Box>
                <Button onClick={deleteProfile}>Supprimer le compte ?</Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <div>

          <Box>
            <Dialog
              fullScreen
              className=""
              open={open}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '0%',
                  left: '50%',
                  transform: 'translate(-50%, 0%)',
                  width: 700,
                  maxWidth: '100%',
                  height: '100%',
                  p: 1,
                  bgcolor: 'background.default',
                }}
              >
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h5">
                    Modification du profil
                  </Typography>
                </Box>
                <form className="profile__edit" onSubmit={editProfile}>
                  <TextField
                    sx={{ mt: 1, mb: 1, mr: 1 }}
                    id="lastName"
                    name="lastname"
                    label="Nom"
                    value={lastname}
                    placeholder="Nom"
                    fullWidth
                    onChange={(event) => setLastname(event.target.value)}
                  />
                  <TextField
                    sx={{ mt: 1, mb: 1, mr: 1 }}
                    id="firstName"
                    name="firstname"
                    label="Prénom"
                    value={firstname}
                    placeholder="Prénom"
                    fullWidth
                    onChange={(event) => setFirstname(event.target.value)}
                  />
                  <TextField
                    sx={{ mt: 1, mb: 1, mr: 1 }}
                    id="phone"
                    name="phone"
                    label="tel"
                    value={phone}
                    placeholder="Numéro"
                    fullWidth
                    onChange={(event) => setPhone(event.target.value)}
                  />
                  <TextField
                    sx={{ mt: 1, mb: 1 }}
                    id="email"
                    name="email"
                    label="email"
                    value={email}
                    placeholder="Email"
                    fullWidth
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <TextField
                    sx={{
                      mt: 1,
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
        </div>
      </main>
    </Box>
  );
}

export default Profile;
