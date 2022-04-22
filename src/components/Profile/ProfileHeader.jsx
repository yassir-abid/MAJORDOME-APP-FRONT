import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import { CardMedia, Typography } from '@mui/material';

import Avatar from '../Avatar/Avatar';

import './profilStyle.scss';

function HomeAppHeader() {
  const [avatar, setAvatar] = useState('/static/images/avatar/1.jpg');
  const [selectedFile, setSelectedFile] = useState('');
  const [data, setData] = useState('');

  const token = localStorage.getItem('token');
  const loadData = async () => {
    try {
      const response = await axios.get('https://majordome-api.herokuapp.com/api/profile', {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log('LoadData response', response.data);
      setData(response.data);
      if (response.data.picture) {
        setAvatar(response.data.picture);
      }
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const response = await axios({
        method: 'patch',
        url: 'https://majordome-api.herokuapp.com/api/profile/avatar',
        data: formData,
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setAvatar(response.data.picture);
      localStorage.setItem('avatar', response.data.picture);
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <header className="profile-header">
        <div className="profile-header_avatar">
          <div>
            <Stack htmlFor="image_up" onClick={handleOpenModal}>
              <Avatar avatar={avatar} firstname={data.firstname} />
            </Stack>
          </div>
        </div>
        <div className="profile-header_title">
          <h1>{data.firstname} {data.lastname}</h1>
        </div>
      </header>
      <div>
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
            <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center' }}> Photo de profil </Typography>
            <TextField
              required
              sx={{ m: 1 }}
              fullWidth
              id="file"
              type="file"
              accept=".jpg, .jpeg, .png"
              name="file"
              onChange={(event) => setSelectedFile(event.target.files[0])}
            />
            {
                    // eslint-disable-next-line no-nested-ternary
                    selectedFile !== '' ? <CardMedia component="img" src={URL.createObjectURL(selectedFile)} sx={{ borderRadius: '50%', maxWidth: 'xs' }} />
                      : selectedFile === '' && avatar !== '/static/images/avatar/1.jpg' ? <CardMedia component="img" src={avatar} sx={{ borderRadius: '50%' }} />
                        : <CardMedia component="img" src="https://www.handiclubnimois.fr/wp-content/uploads/2020/10/blank-profile-picture-973460_1280.png" sx={{ borderRadius: '50%' }} />
                }
            <form className="avatar__add" onSubmit={handleSubmit}>
              <input
                className="input-avatar"
                id="image_up"
                type="file"
                accept=".jpg, .jpeg, .png"
                name="image_up"
                onChange={(event) => {
                  setSelectedFile(event.target.files[0]);
                }}
              />
              <TextField sx={{ m: 1, bgcolor: 'text.disabled' }} fullWidth type="submit" defaultValue="Envoyer" />
            </form>
            <Button className="modal-close1" onClick={handleCloseModal}>Fermer</Button>
          </Box>
        </Modal>
      </div>
    </div>

  );
}

export default HomeAppHeader;
