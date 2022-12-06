/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import { React, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Stack from '@mui/material/Stack';
import { Dialog, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ButtonGroup from '@mui/material/ButtonGroup';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers';

function InterventionsDetail() {
  const { id } = useParams();

  const [infos, setInfos] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [comments, setComments] = useState('');
  const [selectedClient, setselectedClient] = useState('');
  const [project_id, setProjectId] = useState('');
  const [address_id, setAddressId] = useState('');
  const [secondaryText, setSecondaryText] = useState(false);

  const token = localStorage.getItem('token');
  const infoIntervention = async () => {
    try {
      const response = await axios.get(`https://majordome-api.herokuapp.com/api/interventions/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      setInfos(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setDate(response.data.date);
      setEndDate(response.data.end_date);
      setStatus(response.data.status);
      setComments(response.data.comments);
      if (!response.data.description) {
        setSecondaryText(true);
      }
      setselectedClient(response.data.client.id);
      setProjectId(response.data.project_id);
      setAddressId(response.data.address_id);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  const navigate = useNavigate();

  function interventionDelete() {
    if (window.confirm('Êtes vous sur de vouloir supprimer ce projet ?')) {
      navigate('/interventions');
      const interventionToDelete = async () => {
        try {
          await axios.delete(`https://majordome-api.herokuapp.com/api/interventions/${id}`, {
            headers: {
              Authorization: `bearer ${token}`,
            },
          });
        } catch (error) {
          console.log('Erreur de chargement', error);
        }
      };

      interventionToDelete();
    }
  }

  const editIntervention = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`https://majordome-api.herokuapp.com/api/interventions/${id}`, {
        title,
        description,
        date,
        end_date,
        status,
        comments,
        project_id,
        address_id,
      }, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      navigate('/interventions');
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  const [clients, setClients] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [projects, setProjects] = useState([]);

  const loadClients = async () => {
    try {
      const response = await axios.get('https://majordome-api.herokuapp.com/api/clients', {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      setClients(response.data);

      const allAddresses = [];
      response.data.forEach((client) => {
        client.addresses.forEach((address) => {
          allAddresses.push(address);
        });
      });
      setAddresses(allAddresses);

      const allProjects = [];
      response.data.forEach((client) => {
        client.projects.forEach((project) => {
          allProjects.push(project);
        });
      });
      setProjects(allProjects);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  const handleChangeStartDate = (StartDate) => {
    const newStartDate = new Date(StartDate).toISOString();
    setDate(newStartDate);
  };

  const handleChangeEndDate = (EndDate) => {
    const newEndDate = new Date(EndDate).toISOString();
    setEndDate(newEndDate);
  };

  useEffect(() => {
    infoIntervention();
    loadClients();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  if (!infos) {
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
            <DeleteIcon onClick={() => interventionDelete(infos.id)} />
          </Fab>
          <Typography variant="h5" gutterBottom component="div" sx={{ color: 'white' }}>
            {infos.title}
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
              key={infos.id}
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
                primary={`${infos.client.lastname} ${infos.client.firstname}`}
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
              key={infos.id}
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
                primary={infos.description ? `${infos.description}` : null}
                secondary={secondaryText ? 'Aucune description pour cette intervention' : null}
              />
            </ListItem>
            <Typography>Date de début</Typography>
            <ListItem
              key={infos.date}
              sx={{
                mb: 1,
                borderRadius: '5px',
                border: 1,
                boxShadow: 3,
                borderColor: 'primary.light',
                bgcolor: 'white',
              }}
            >
              <TextField
                id="date"
                value={new Date(infos.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
                variant="standard"
              />
            </ListItem>
            <Typography>Date de fin</Typography>
            <ListItem
              key={infos.end_date}
              sx={{
                mb: 1,
                borderRadius: '5px',
                border: 1,
                boxShadow: 3,
                borderColor: 'primary.light',
                bgcolor: 'white',
              }}
            >
              <TextField
                id="end_date"
                value={new Date(infos.end_date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
                variant="standard"
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
            <ButtonGroup variant="text" size="small">
              <Button href={`/documents/interventions/${id}`} sx={{ mt: 4, mb: 4 }} size="large" color="secondary" variant="contained">Documents</Button>
              <Button href={`/interventions/${id}/report`} sx={{ mt: 4, mb: 4 }} size="large" color="secondary" variant="contained">
                Rapport <br />d&apos;intervention
              </Button>
            </ButtonGroup>
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
              <Typography variant="h5">Modification de l&apos;intervention {infos.title} </Typography>
              <form onSubmit={editIntervention}>
                <TextField
                  required
                  sx={{ mt: 3, mb: 1 }}
                  fullWidth
                  label="Nom de l'intervention"
                  type="text"
                  name="title"
                  placeholder="Nom de l'intervention"
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
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                  <Stack sx={{ mb: 1 }}>
                    <MobileDateTimePicker
                      label="Date de début"
                      name="date"
                      value={date}
                      onChange={handleChangeStartDate}
                      inputFormat="dd/MM/yyyy hh:mm a"
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                  <Stack sx={{ mb: 1 }}>
                    <MobileDateTimePicker
                      label="Date de fin"
                      name="end_date"
                      value={end_date}
                      onChange={handleChangeEndDate}
                      inputFormat="dd/MM/yyyy hh:mm a"
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
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
                <Box sx={{ mb: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choisir un statut</InputLabel>
                    <Select
                      required
                      value={status}
                      onChange={(event) => setStatus(event.target.value)}
                      name="status"
                      className="interventions__select"
                    >
                      <MenuItem value=""><Typography sx={{ fontStyle: 'italic' }}>Aucun</Typography></MenuItem>
                      <MenuItem value="Programmée">Programmée</MenuItem>
                      <MenuItem value="Terminée">Terminée</MenuItem>
                      <MenuItem value="Annulée">Annulée</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ mt: 1, mb: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choisir un client</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedClient}
                      onChange={(event) => setselectedClient(event.target.value)}
                      name="client_id"
                      label="Choisir un client"
                    >
                      <MenuItem value=""><Typography sx={{ fontStyle: 'italic' }}>Aucun</Typography></MenuItem>
                      {clients.map((client) => (
                        <MenuItem key={client.id} value={client.id}>{`${client.firstname} ${client.lastname}`}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ mt: 1, mb: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choisir un projet</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={project_id}
                      onChange={(event) => setProjectId(event.target.value)}
                      name="project_id"
                      label="Choisir un projet"
                    >
                      <MenuItem value=""><Typography sx={{ fontStyle: 'italic' }}>Aucun</Typography></MenuItem>
                      {projects
                        .filter((project) => Number(project.client_id) === Number(selectedClient))
                        .map((project) => (
                          <MenuItem key={project.id} value={project.id}>{`${project.title}`}</MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ mt: 1, mb: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choisir une adresse</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={address_id}
                      onChange={(event) => setAddressId(event.target.value)}
                      name="address_id"
                      label="Choisir une adresse"
                    >
                      <MenuItem value=""><Typography sx={{ fontStyle: 'italic' }}>Aucune</Typography></MenuItem>
                      {addresses
                        .filter((address) => Number(address.client_id) === Number(selectedClient))
                        .map((address) => (
                          <MenuItem key={address.id} value={address.id}>{address.number} {address.street} {address.postal_code} {address.city}</MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Box>
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

export default InterventionsDetail;
