/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers';

import { changeValue, addIntervention } from '../../actions/intervention';
import InterventionsHeader from './InterventionsHeader';
import ListInterventions from './ListInterventions';

import baseUrl from '../../utils';

function Interventions() {
  const [inters, setInters] = useState([]);
  const [clients, setClients] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedClient, setselectedClient] = useState({});

  const token = localStorage.getItem('token');
  const loadData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/interventions`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      setInters(response.data);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  const loadClients = async () => {
    try {
      const response = await axios.get(`${baseUrl}/clients`, {
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
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  const [projects, setProjects] = useState([]);
  const loadProjects = async () => {
    try {
      const response = await axios.get(`${baseUrl}/projects`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      setProjects(response.data);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  useEffect(() => {
    loadClients();
    loadProjects();
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [inputText, setInputText] = useState('');
  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const addInterventionToState = (intervention) => {
    setInters([...inters, intervention]);
    handleCloseModal();
  };

  const {
    title, description, status, comments, client_id, project_id, address_id,
  } = useSelector((state) => state.intervention);

  const [selectedStartDate, setStartDateChange] = useState(new Date());
  const [selectedEndDate, setEndDateChange] = useState(new Date());

  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.name === 'client_id') {
      setselectedClient(e.target.value);
    }
    dispatch(changeValue(e.target.value, e.target.name));
  };

  const handleChangeStartDate = (StartDate) => {
    const newStartDate = new Date(StartDate).toISOString();
    setStartDateChange(newStartDate);
    dispatch(changeValue(selectedStartDate, 'date'));
  };

  const handleChangeEndDate = (EndDate) => {
    const newEndDate = new Date(EndDate).toISOString();
    setEndDateChange(newEndDate);
    dispatch(changeValue(selectedEndDate, 'end_date'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addIntervention(addInterventionToState));
  };

  const StyledFab = styled(Fab)({
    position: 'fixed',
    zIndex: 1,
    bottom: 80,
    right: 25,
    margin: '0 auto',
  });

  return (
    <Box sx={{ minHeight: '90vh', pb: '5rem' }}>
      <InterventionsHeader />
      <div>
        <Box
          sx={{
            mt: 2,
            ml: 1,
            mr: 1,

          }}
        >
          <TextField
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            label="Search"
          />
        </Box>
        <ListInterventions input={inputText} inters={inters} />
        <div>
          <StyledFab size="medium" color="secondary" aria-label="add">
            <AddIcon onClick={handleOpenModal} />
          </StyledFab>
        </div>
      </div>

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
            <form
              onSubmit={handleSubmit}
            >
              <Typography variant="h5">
                Nouvelle intervention
              </Typography>
              <label>
                <TextField
                  required
                  sx={{ mt: 3, mb: 1 }}
                  fullWidth
                  label="Nom de l'intervention"
                  type="text"
                  name="title"
                  placeholder="Nom de l'intervention"
                  value={title}
                  onChange={handleChange}
                />
              </label>
              <label>
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
                  onChange={handleChange}
                />
              </label>
              <label>
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
                  onChange={handleChange}
                />
              </label>
              <LocalizationProvider dateAdapter={AdapterLuxon}>
                <Stack sx={{ mb: 1 }}>
                  <MobileDateTimePicker
                    label="Date de début"
                    name="date"
                    value={selectedStartDate}
                    onChange={handleChangeStartDate}
                    inputFormat="dd/MM/yyyy hh:mm a"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
                <Stack sx={{ mb: 1 }}>
                  <MobileDateTimePicker
                    label="Date de fin"
                    name="end_date"
                    value={selectedEndDate}
                    onChange={handleChangeEndDate}
                    inputFormat="dd/MM/yyyy hh:mm a"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
              <Box sx={{ mt: 1, mb: 1 }}>
                <FormControl fullWidth required>
                  <InputLabel id="demo-simple-select-label">Choisir un statut</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    onChange={handleChange}
                    name="status"
                    label="Choisir un statut"
                  >
                    <MenuItem value=""><Typography sx={{ fontStyle: 'italic' }}>Aucun</Typography></MenuItem>
                    <MenuItem value="Programmée">Programmée</MenuItem>
                    <MenuItem value="Terminée">Terminée</MenuItem>
                    <MenuItem value="Annulée">Annulée</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mt: 1, mb: 1 }}>
                <FormControl fullWidth required>
                  <InputLabel id="demo-simple-select-label">Choisir un client</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={client_id}
                    onChange={handleChange}
                    name="client_id"
                    label="Choisir un client"

                  >
                    <MenuItem value=""><Typography sx={{ fontStyle: 'italic' }}>Aucun</Typography></MenuItem>
                    {clients.map((client) => (
                      <MenuItem key={client.id} value={client.id}>{`${client.lastname} ${client.firstname}`}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mt: 1, mb: 1 }}>
                <FormControl fullWidth required>
                  <InputLabel id="demo-simple-select-label">Choisir un projet</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={project_id}
                    onChange={handleChange}
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
                <FormControl fullWidth required>
                  <InputLabel id="demo-simple-select-label">Choisir une adresse</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={address_id}
                    onChange={handleChange}
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
  );
}

export default Interventions;
