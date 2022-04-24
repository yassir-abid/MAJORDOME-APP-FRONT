/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */

// ici import React
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// ici import component MUI
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

// import du components de l'intervention
import { changeValue, addIntervention } from '../../actions/intervention';
import InterventionsHeader from './InterventionsHeader';
import ListInterventions from './ListInterventions';

// import du css
// import './interventions.scss';

function Interventions() {
  // request to add clients
  const [clients, setClients] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedClient, setselectedClient] = useState({});

  const token = localStorage.getItem('token');

  const loadClients = async () => {
    try {
      const response = await axios.get('https://majordome-api.herokuapp.com/api/clients', {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      setClients(response.data);

      // j'initialise un tableau à vide pour récupérer toutes les adresses des clients
      // afin de les afficher dans le formulaire en liste déroulante
      const allAddresses = [];
      // je boucle sur la liste de mes clients
      response.data.forEach((client) => {
        // pour chaque client, je boucle sur ses addresses
        // rappel: depuis la BDD, on récupère dans chaque objet client, un tableau d'objets adresses
        client.addresses.forEach((address) => {
          // je push l'adresse dans le tableau vide allAddresses
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
      const response = await axios.get('https://majordome-api.herokuapp.com/api/projects', {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [inputText, setInputText] = useState('');
  const inputHandler = (e) => {
    // convert input text to lower case
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const {
    // eslint-disable-next-line camelcase
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
    dispatch(addIntervention());
  };

  // code pour le + violet
  const StyledFab = styled(Fab)({
    position: 'fixed',
    zIndex: 1,
    bottom: 80,
    right: 25,
    margin: '0 auto',
  });

  return (
    <Box
      sx={{
      // height: '100vh',
      }}
    >
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
        <ListInterventions input={inputText} />
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
            <form
              onSubmit={handleSubmit}
            >
              <Typography variant="h5">
                Nouvelle intervention
              </Typography>
              <label>
                <TextField
                  required
                  sx={{ mt: 1, mb: 1 }}
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
                <Stack spacing={1} sx={{ mt: 2, mb: 2 }}>
                  <MobileDateTimePicker
                    label="Date de début"
                    name="date"
                    value={selectedStartDate}
                    onChange={handleChangeStartDate}
                    inputFormat="dd/MM/yyyy hh:mm a"
                    renderInput={(params) => <TextField {...params} />}
                  />
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

              {/* Choisir un client */}
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
                      <MenuItem key={client.id} value={client.id}>{`${client.firstname} ${client.lastname}`}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              {/* Choisir un project */}
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
  //  <div className="interventions">
  //    <InterventionsHeader />
  //    <div className="interventions-main">
  //      <div>
  //        <TextField
  //          className="interventions-searchBar"
  //          id="outlined-basic"
  //          onChange={inputHandler}
  //          variant="outlined"
  //          fullWidth
  //          label="Search"
  //        />
  //      </div>
  //      <List input={inputText} />
  //
  //      <div className="interventions__add">
  //        <Icon onClick={handleOpenModal} icon="carbon:add-filled" width="50" height="50" />
  //      </div>
  //
  //      <Modal
  //        className=""
  //        open={open}
  //        onClose={handleCloseModal}
  //        aria-labelledby="modal-modal-title"
  //        aria-describedby="modal-modal-description"
  //      >
  //        <Box
  //          className="interventions-modal"
  //        >
  //          <form
  //            className="intervention__add"
  //            onSubmit={handleSubmit}
  //          >
  //            <label>
  //              <TextField
  //                required
  //                sx={{ m: 1 }}
  //                fullWidth
  //                label="Nom de l'intervention"
  //                type="text"
  //                name="title"
  //                placeholder="Nom de l'intervention"
  //                value={title}
  //                onChange={handleChange}
  //              />
  //            </label>
  //            <label>
  //              <TextField
  //                sx={{ m: 1 }}
  //                id="outlined-multiline-static"
  //                label="Description"
  //                fullWidth
  //                multiline
  //                rows={4}
  //                name="description"
  //                placeholder="Description"
  //                value={description}
  //                onChange={handleChange}
  //              />
  //            </label>
  //            <LocalizationProvider dateAdapter={AdapterLuxon}>
  //              <Stack spacing={3} sx={{ m: 1 }}>
  //                <MobileDateTimePicker
  //                  label="Date de début"
  //                  name="date"
  //                  value={selectedStartDate}
  //                  onChange={handleChangeStartDate}
  //                  inputFormat="dd/MM/yyyy hh:mm a"
  //                  renderInput={(params) => <TextField {...params} />}
  //                />
  //                <MobileDateTimePicker
  //                  label="Date de fin"
  //                  name="end_date"
  //                  value={selectedEndDate}
  //                  onChange={handleChangeEndDate}
  //                  inputFormat="dd/MM/yyyy hh:mm a"
  //                  renderInput={(params) => <TextField {...params} />}
  //                />
  //              </Stack>
  //            </LocalizationProvider>
  //            {/* <LocalizationProvider dateAdapter={AdapterLuxon}>
  //              <Stack spacing={3} sx={{ m: 1 }}>
  //                <DateTimePicker
  //                  label="Date de début"
  //                  name="end_date"
  //                  value={date}
  //                  onChange={handleChange}
  //                  renderInput={(params) => <TextField {...params} />}
  //                />
  //                <DateTimePicker
  //                  label="Date de fin"
  //                  name="date"
  //                  value={end_date}
  //                  onChange={handleChange}
  //                  renderInput={(params) => <TextField {...params} />}
  //                />
  //              </Stack>
  //            </LocalizationProvider> */}
  //            {/* <label>
  //              <TextField
  //                required
  //                sx={{ m: 1 }}
  //                id="outlined-multiline-static"
  //                label="Date de début"
  //                fullWidth
  //                name="date"
  //                placeholder="Date de début"
  //                value={date}
  //                onChange={handleChange}
  //              />
  //            </label>
  //            <label>
  //              <TextField
  //                required
  //                sx={{ m: 1 }}
  //                id="outlined-multiline-static"
  //                label="Date de fin"
  //                fullWidth
  //                name="end_date"
  //                placeholder="Date de fin"
  //                // eslint-disable-next-line camelcase
  //                value={end_date}
  //                onChange={handleChange}
  //              />
  //            </label> */}
  //            <select
  //              required
  //            // eslint-disable-next-line camelcase
  //              value={status}
  //              onChange={handleChange}
  //              name="status"
  //              className="interventions__select"
  //            >
  //              <option value="" disabled selected>Choisir un statut</option>
  //              <option
  //                value="Programmée"
  //              >
  //                Programmée
  //              </option>
  //              <option
  //                value="Terminée"
  //              >
  //                Terminée
  //              </option>
  //              <option
  //                value="Annulée"
  //              >
  //                Annulée
  //              </option>
  //            </select>
  //            <label>
  //              <TextField
  //                sx={{ m: 1 }}
  //                id="outlined-multiline-static"
  //                label="Commentaires"
  //                fullWidth
  //                multiline
  //                maxRows={4}
  //                name="comments"
  //                placeholder="Commentaires"
  //                value={comments}
  //                onChange={handleChange}
  //              />
  //            </label>
  //            <select
  //              sx={{ m: 1 }}
  //              required
  //              // eslint-disable-next-line camelcase
  //              value={client_id}
  //              onChange={handleChange}
  //              name="client_id"
  //              className="interventions__select"
  //            >
  //              <option value="" disabled selected>Choisir un client</option>
  //              {clients.map((client) => (
  //                <option
  //                  key={client.id}
  //                  value={client.id}
  //                >
  //                  {client.firstname} {client.lastname}
  //                </option>
  //              ))}
  //            </select>
  //            <select
  //              sx={{ m: 1 }}
  //              required
  //            // eslint-disable-next-line camelcase
  //              value={project_id}
  //              onChange={handleChange}
  //              name="project_id"
  //              className="interventions__select"
  //            >
  //              <option value="" disabled selected>Choisir un projet</option>
  //              {
  //                  projects
  //                    .filter((project) => Number(project.client_id) === Number(selectedClient))
  //                    .map((project) => (
  //                      <option
  //                        key={project.id}
  //                        value={project.id}
  //                      >
  //                        {project.title}
  //                      </option>
  //                    ))
  //              }
  //            </select>
  //            <select
  //              sx={{ m: 1 }}
  //              required
  //            // eslint-disable-next-line camelcase
  //              value={address_id}
  //              onChange={handleChange}
  //              name="address_id"
  //              className="interventions__select"
  //            >
  //              <option value="" disabled selected>Choisir une addresse</option>
  //              {
  //                  addresses
  //                    .filter((address) => Number(address.client_id) === Number(selectedClient))
  //                    .map((address) => (
  //                      <option
  //                        key={address.id}
  //                        value={address.id}
  //                      >
  //                        {address.number} {address.street} {address.postal_code} {address.city}
  //                      </option>
  //                    ))
  //              }
  //            </select>
  //            <TextField sx={{ m: 1, bgcolor: 'text.disabled' }} fullWidth type="submit" defaultValue="Envoyer" />
  //          </form>
  //          <Button className="modal-close1" onClick={handleCloseModal}>Fermer</Button>
  //        </Box>
  //      </Modal>
  //    </div>
  //  </div>
  );
}

export default Interventions;
