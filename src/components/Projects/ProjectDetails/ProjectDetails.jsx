/* eslint-disable react/jsx-indent */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';
import { Dialog, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Chip from '@mui/material/Chip';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ButtonGroup from '@mui/material/ButtonGroup';
import Modal from '@mui/material/Modal';

import ListInterventions from '../../Interventions/ListInterventions';
// import ProjectDetail from './ProjectDetail';
// import './projectDetails.scss';

// eslint-disable-next-line react/prop-types
function ProjectDetails() {
  // const params = useParams();
  const { id } = useParams();
  // console.log(id);

  const [data, setData] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [secondaryText, setSecondaryText] = useState(false);
  const [comments, setComments] = useState('');

  const token = localStorage.getItem('token');

  const loadData = async () => {
    try {
      const response = await axios.get(`https://majordome-api.herokuapp.com/api/projects/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log(response);
      setData(response.data);
      // edit the modal
      setTitle(response.data.title);
      if (!response.data.description) {
        setSecondaryText(true);
      }
      setDescription(response.data.description);
      setComments(response.data.comments);
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
  function projectDelete() {
    if (window.confirm('Etes vous sur de vouloir supprimer ce projet ?')) {
      navigate('/projects');
      const projectToDelete = async () => {
        try {
          const response = await axios.delete(`https://majordome-api.herokuapp.com/api/projects/${id}`, {
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

      projectToDelete();
    }
  }

  // function to edit one project with his id
  const editProject = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`https://majordome-api.herokuapp.com/api/projects/${id}`, {
        title,
        description,
        comments,
        client_id: data.client.id,
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

  // modal to update project
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  if (!data || !data.client) {
    return null;
  }
  return (
    <Box>
      <Box>
        <Box
          sx={{
            // zIndex: 1,
            // position: 'absolute',
            // top: '0%',
            // left: '10',
            // p: 0.8,
          }}
        >
          {/* <Link to="/Profile">
          <Avatar avatar={avatar} firstname={firstname} />
        </Link> */}
        </Box>
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
            <DeleteIcon onClick={() => projectDelete(data.id)} />
          </Fab>
          {/* <Icon icon="ri:delete-bin-2-fill" width="30" height="30" /> */}

          <Typography variant="h5" gutterBottom component="div" sx={{ color: 'white' }}>
            {data.title}
          </Typography>
          <Fab size="small" color="secondary" aria-label="edit">
            <EditIcon onClick={handleOpenModal} />
          </Fab>
          {/* <Icon icon="bxs:edit-alt" width="30" height="30"/> */}

        </Box>
      </Box>
      <Box>
        <Box
          component="form"
          sx={{
            m: 1,
          }}
          noValidate
          autoComplete="off"
        >
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            '& > :not(style)': {
              height: '100%',
            },
          }}
          >
            <Typography>Client</Typography>
            <ListItem
              key={data.id}
              sx={{
                mb: 1,
                borderRadius: '5px',
                border: 1,
                boxShadow: 3,
                borderColor: 'primary.light',
                bgcolor: 'white',
              }}
            >
              <ListItemText
                primary={`${data.client.firstname} ${data.client.lastname}`}
              />
            </ListItem>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            '& > :not(style)': {
              height: '100%',
            },
          }}
          >
            <Typography>Description</Typography>
            <ListItem
              key={data.id}
              sx={{
                mb: 1,
                borderRadius: '5px',
                border: 1,
                boxShadow: 3,
                borderColor: 'primary.light',
                bgcolor: 'white',
              }}
            >
              <ListItemText
                primary={data.description ? `${data.description}` : null}
                secondary={secondaryText ? 'Aucune description pour ce projet' : null}
              />
            </ListItem>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              '& > *': {
                m: 1,
              },
            }}
          >
            {/* créer ou vérifier les liens de chaque boutons */}
            {/* <Link to={`/documents/clients/${id}`}> */}
            <Button href={`/documents/projects/${id}`} sx={{ mt: 4, mb: 4 }} size="large" color="secondary" variant="contained">Documents</Button>
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{ m: 1 }}
            variant="h6"
            gutterBottom
            component="div"
          >Listes des interventions du projet :
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mr: 1,
              ml: 1,
            }}
          >
            { data.interventions.length > 0
              ? (
                <List>
                  {data.interventions.map((intervention) => (
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      flexWrap: 'wrap',
                      '& > :not(style)': {
                        mb: 1,
                        height: '100%',
                      },
                    }}
                    >
                      {/* <Paper elevation={3}> */}
                      <Link to={`/interventions/${intervention.id}`} key={intervention.id}>
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
                            primary={`${intervention.title}`}
                          />
                          <Chip size="small" sx={{ minWidth: 90 }} label={intervention.status} color="primary" />
                        </ListItem>
                      </Link>
                      {/* </Paper> */}
                    </Box>
                  ))}
                </List>
              )
              : (
                <Typography
                  sx={{ m: 1, fontStyle: 'italic' }}
                  variant="h8"
                  gutterBottom
                  component="div"
                >Aucune intervention liée à ce projet
                </Typography>
              )}
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
          >
            <Box
              sx={{
                position: 'absolute',
                top: '0%',
                left: '50%',
                transform: 'translate(-50%, 0%)',
                width: 500,
                maxWidth: '100%',
                height: '100vh',
                p: 1,
                bgcolor: 'background.default',
              }}
            >
              <Typography>Modification du projet {data.title} </Typography>
              <form onSubmit={editProject}>
              <TextField
                required
                sx={{ mt: 1, mb: 1 }}
                fullWidth
                label="Nom du projet"
                type="text"
                name="title"
                placeholder="Nom du projet"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
              <TextField
                sx={{ mb: 1 }}
                id="outlined-multiline-static"
                label="Description"
                fullWidth
                multiline
                rows={4}
                name="description"
                placeholder="Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <TextField
                sx={{ mb: 1 }}
                id="outlined-multiline-static"
                label="Commentaires"
                fullWidth
                multiline
                maxRows={4}
                name="comments"
                placeholder="Commentaires"
                value={comments}
                onChange={(event) => setComments(event.target.value)}
              />
              <TextField
                sx={{ mb: 1 }}
                id="outlined-multiline-static"
                label="client_id"
                fullWidth
                multiline
                maxRows={4}
                name="client_id"
                placeholder="client_id"
                value={data.client.id}
              />
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
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
}

export default ProjectDetails;
