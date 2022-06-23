import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Dialog, CardMedia, Typography } from '@mui/material';

import Avatar from '../Avatar/Avatar';

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

  const navigate = useNavigate();

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
      if (response.data.picture) {
        setAvatar(response.data.picture);
        localStorage.setItem('avatar', response.data.picture);
      }
      loadData();
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
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box>
          <Stack htmlFor="image_up" onClick={handleOpenModal}>
            <Avatar avatar={avatar} firstname={data.firstname} />
          </Stack>
        </Box>
        <Box
          sx={{
            m: 1,
          }}
        >
          <Typography>{data.lastname} {data.firstname}</Typography>
        </Box>
      </Box>
      <div>
        <Dialog
          fullScreen
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
              p: 1,
              bgcolor: 'background.default',
              height: 'auto',
              minHeight: '100vh',
            }}
          >
            <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center' }}> Photo de profil </Typography>
            <TextField
              required
              sx={{ p: 1 }}
              fullWidth
              id="file"
              type="file"
              accept=".jpg, .jpeg, .png"
              name="file"
              onChange={(event) => setSelectedFile(event.target.files[0])}
            />
            {
                    // eslint-disable-next-line no-nested-ternary
                    selectedFile !== '' ? (
                      <CardMedia component="img" src={URL.createObjectURL(selectedFile)} sx={{ borderRadius: '50%', maxWidth: '50%', m: 'auto' }} />
                    )
                      : selectedFile === '' && avatar !== '/static/images/avatar/1.jpg' ? <CardMedia component="img" src={avatar} sx={{ borderRadius: '50%', maxWidth: '50%', m: 'auto' }} />
                        : <CardMedia component="img" src="https://www.handiclubnimois.fr/wp-content/uploads/2020/10/blank-profile-picture-973460_1280.png" sx={{ borderRadius: '50%', maxWidth: '50%', m: 'auto' }} />
                }
            <form onSubmit={handleSubmit}>
              <input
                hidden
                id="image_up"
                type="file"
                accept=".jpg, .jpeg, .png"
                name="image_up"
                onChange={(event) => {
                  setSelectedFile(event.target.files[0]);
                }}
              />
              <TextField
                sx={{
                  mt: 2,
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
      </div>
    </Box>

  );
}

export default HomeAppHeader;
