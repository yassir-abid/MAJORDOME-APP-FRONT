/* eslint-disable react/jsx-indent */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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

function ProjectDetails() {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const { id } = useParams();

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
      setData(response.data);
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
          setData(response.data);
        } catch (error) {
          console.log('Erreur de chargement', error);
        }
      };

      projectToDelete();
    }
  }

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
      loadData();
      handleCloseModal();
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  if (!data || !data.client) {
    return null;
  }
  return (
    <Box>
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
        }}
        >
          <Fab size="small" color="secondary" aria-label="edit">
            <DeleteIcon onClick={() => projectDelete(data.id)} />
          </Fab>

          <Typography variant="h5" gutterBottom component="div" sx={{ color: 'white' }}>
            {data.title}
          </Typography>
          <Fab size="small" color="secondary" aria-label="edit">
            <EditIcon onClick={handleOpenModal} />
          </Fab>

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
                primary={`${data.client.lastname} ${data.client.firstname}`}
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
                width: '100%',
                height: 'auto',
                minHeight: '100vh',
                p: 1,
                bgcolor: 'background.default',
              }}
            >
              <Typography variant="h5">Modification du projet {data.title} </Typography>
              <form onSubmit={editProject}>
              <TextField
                required
                sx={{ mt: 3, mb: 1 }}
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
                label="client"
                fullWidth
                multiline
                maxRows={4}
                name="client_id"
                placeholder="client"
                value={`${data.client.lastname} ${data.client.firstname}`}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <TextField
                  sx={{
                    mb: 1,
                    mt: 1,
                    bgcolor: 'primary.light',
                    borderRadius: '5px',
                    width: 500,
                    maxWidth: '100%',
                  }}
                  fullWidth
                  type="submit"
                  value="Valider"
                  defaultValue="Envoyer"
                />
              </Box>
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
