/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import {
  Link, useNavigate, useParams, NavLink,
} from 'react-router-dom';

import TextField from '@mui/material/TextField';
import { Dialog, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';

// import './documentsDetail.scss';

import axios from 'axios';

function DocumentsDetail() {
  const { id } = useParams();
  // console.log(id);
  const [data, setData] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [secondaryText, setSecondaryText] = useState(false);

  const token = localStorage.getItem('token');

  const loadData = async () => {
    try {
      const response = await axios.get(`https://majordome-api.herokuapp.com/api/documents/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log(response);
      setData(response.data);
      // edit the modal
      setTitle(response.data.title);
      setDescription(response.data.description);
      if (!response.data.description) {
        setSecondaryText(true);
      }
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  // function to delete one project with his id
  function documentDelete() {
    if (window.confirm('Etes vous sur de vouloir supprimer ce projet ?')) {
      navigate('/documents');
      const documentToDelete = async () => {
        try {
          const response = await axios.delete(`https://majordome-api.herokuapp.com/api/documents/${id}`, {
            headers: {
              Authorization: `bearer ${token}`,
            },
          });
            // console.log(response);
          setData(response.data);
        } catch (error) {
          console.log('Erreur de chargement', error);
        }
      };

      documentToDelete();
    }
  }

  // function to edit one project with his id
  const editDocument = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`https://majordome-api.herokuapp.com/api/documents/${id}`, {
        title,
        description,
      }, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      navigate('/projects');
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  // download document
  //   const saveFile = () => {
  //     saveAs(
  //       `${data.path}`,
  //     );
  //   };

  // modal to update project
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  if (!data) {
    return null;
  }
  return (
    <Box>
      <Box sx={{
        bgcolor: 'primary.main',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomLeftRadius: '17px',
        borderBottomRightRadius: '17px',
        height: 60,
        pl: 1,
        pr: 1,
        pt: 1,
        // p: 1,
      }}
      >
        <Fab size="small" color="secondary" aria-label="edit">
          <DeleteIcon onClick={() => documentDelete(data.id)} />
        </Fab>
        {/* <Icon icon="ri:delete-bin-2-fill" width="30" height="30" /> */}

        <Typography variant="h5" gutterBottom component="div" sx={{ color: 'white' }}>
          Document
        </Typography>
        <Fab size="small" color="secondary" aria-label="edit">
          <EditIcon onClick={handleOpenModal} />
        </Fab>
        {/* <Icon icon="bxs:edit-alt" width="30" height="30"/> */}

      </Box>

      <Box sx={{ m: 1 }}>
        <Box>
          <Typography sx={{ mt: 4 }}>
            Titre :
          </Typography>
          <ListItem
            sx={{
              mt: 1,
              mb: 2,
              borderRadius: '5px',
              border: 1,
              boxShadow: 3,
              borderColor: 'primary.light',
              bgcolor: 'white',
            }}
          >
            <ListItemText
              primary={data.title}
            />
          </ListItem>
          <Typography sx={{ mt: 1 }}>
            Description :
          </Typography>
          <ListItem
            sx={{
              mt: 1,
              mb: 2,
              borderRadius: '5px',
              border: 1,
              boxShadow: 3,
              borderColor: 'primary.light',
              bgcolor: 'white',
            }}
          >
            <ListItemText
              primary={data.description ? `${data.description}` : null}
              secondary={secondaryText ? 'Aucune description pour ce document' : null}
            />
          </ListItem>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <a target="_blank" href={`${data.path}`} rel="noreferrer">
            <Button variant="contained">Afficher le document</Button>
            {/* <a href={`${data.path}`}>Afficher le document</a> */}
          </a>
        </Box>
      </Box>

      {/* modal to edit project */}
      <Box
        sx={{
          maxHeight: '100%',
        }}
      >
        <Dialog
          fullScreen
          open={open}
          onClose={handleCloseModal}
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
            <Box>
              <Box>
                <Typography>Modification du document </Typography>
              </Box>
              <form onSubmit={editDocument}>
                <TextField
                  required
                  sx={{ mt: 4, mb: 1 }}
                  fullWidth
                  label="Nom du document"
                  type="text"
                  name="title"
                  placeholder="Nom du document"
                  value={title}
                // onChange={handleChange}
                  onChange={(event) => setTitle(event.target.value)}
                />
                <TextField
                  sx={{ mt: 1, mb: 1 }}
                  id="outlined-multiline-static"
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  name="description"
                  placeholder="Description"
                  value={description}
                // onChange={handleChange}
                  onChange={(event) => setDescription(event.target.value)}
                />
                {/* <TextField
                sx={{ mb: 1 }}
                id="outlined-multiline-static"
                label="Commentaires"
                fullWidth
                multiline
                maxRows={4}
                name="comments"
                placeholder="Commentaires"
                value={comments}
                // onChange={handleChange}
                onChange={(event) => setComments(event.target.value)}
              /> */}
                {/* <TextField
                  sx={{ mb: 1 }}
                  id="outlined-multiline-static"
                  label="client_id"
                  fullWidth
                  multiline
                  maxRows={4}
                  name="client_id"
                  placeholder="client_id"
                /> */}
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
                  <CancelIcon fontSize="large" color="secondary" onClick={handleCloseModal}> </CancelIcon>
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Dialog>
      </Box>
    </Box>
  );
}

export default DocumentsDetail;
