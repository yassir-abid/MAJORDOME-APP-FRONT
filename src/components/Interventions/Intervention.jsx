/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */

// ici import React
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// ici import component MUI
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Icon } from '@iconify/react';
import Stack from '@mui/material/Stack';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers';

// import du components de l'intervention
import { changeValue, addIntervention } from '../../actions/intervention';
import InterventionsHeader from './InterventionsHeader';
import List from './List';

// import du css
import './interventions.scss';

function Interventions() {
  // request to add clients
  const [clients, setClients] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedClient, setselectedClient] = useState({});

  const [selectedStartDate, handleStartDateChange] = useState(new Date());
  console.log(selectedStartDate);
  const [selectedEndDate, handleEndDateChange] = useState(new Date());
  console.log(selectedEndDate);

  const token = localStorage.getItem('token');

  const loadClients = async () => {
    try {
      const response = await axios.get('https://majordome-api.herokuapp.com/api/clients', {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log('get clients response', response.data);
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

  console.log('clients', clients);
  console.log('addresses', addresses);
  console.log('selectedClient', selectedClient);

  const [projects, setProjects] = useState([]);
  const loadProjects = async () => {
    try {
      const response = await axios.get('https://majordome-api.herokuapp.com/api/projects', {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log('get projects response', response.data);
      setProjects(response.data);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };
  console.log('projects', projects);

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
    title, description, date, end_date, status, comments, client_id, project_id, address_id,
  } = useSelector((state) => state.intervention);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.name === 'client_id') {
      setselectedClient(e.target.value);
    }
    dispatch(changeValue(e.target.value, e.target.name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addIntervention());
  };

  return (
    <div className="interventions">
      <InterventionsHeader />
      <div className="interventions-main">
        <div>
          <TextField
            className="interventions-searchBar"
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            label="Search"
          />
        </div>
        <List input={inputText} />
        {/* <div className="interventions-addintervention">
          <Icon icon="carbon:add-filled" width="30" height="30" />
        </div> */}

        <div className="interventions__add">
          <Icon onClick={handleOpenModal} icon="carbon:add-filled" width="50" height="50" />
        </div>

        <Modal
          className=""
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            className="interventions-modal"
          >
            <form
              className="intervention__add"
              onSubmit={handleSubmit}
            >
              <label>
                <TextField
                  required
                  sx={{ m: 1 }}
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
                  sx={{ m: 1 }}
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
              <LocalizationProvider dateAdapter={AdapterLuxon}>
                <Stack spacing={3} sx={{ m: 1 }}>
                  <MobileDateTimePicker
                    label="Date de début"
                    name="end_date"
                    value={selectedStartDate}
                    onChange={handleStartDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <MobileDateTimePicker
                    label="Date de fin"
                    name="date"
                    value={selectedEndDate}
                    onChange={handleEndDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
              {/* <label>
                <TextField
                  required
                  sx={{ m: 1 }}
                  id="outlined-multiline-static"
                  label="Date de début"
                  fullWidth
                  multiline
                  rows={4}
                  name="date"
                  placeholder="Date de début"
                  value={date}
                  onChange={handleChange}
                />
              </label>
              <label>
                <TextField
                  required
                  sx={{ m: 1 }}
                  id="outlined-multiline-static"
                  label="Date de fin"
                  fullWidth
                  multiline
                  rows={4}
                  name="end_date"
                  placeholder="Date de fin"
                  // eslint-disable-next-line camelcase
                  value={end_date}
                  onChange={handleChange}
                />
              </label> */}
              <select
                required
              // eslint-disable-next-line camelcase
                value={status}
                onChange={handleChange}
                name="status"
                className="interventions__select"
              >
                <option value="" disabled selected>Choisir un statut</option>
                <option
                  value="Programmée"
                >
                  Programmée
                </option>
                <option
                  value="Terminée"
                >
                  Terminée
                </option>
                <option
                  value="Annulée"
                >
                  Annulée
                </option>
              </select>
              <label>
                <TextField
                  sx={{ m: 1 }}
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
              <select
                sx={{ m: 1 }}
                required
                // eslint-disable-next-line camelcase
                value={client_id}
                onChange={handleChange}
                name="client_id"
                className="interventions__select"
              >
                <option value="" disabled selected>Choisir un client</option>
                {clients.map((client) => (
                  <option
                    key={client.id}
                    value={client.id}
                  >
                    {client.firstname} {client.lastname}
                  </option>
                ))}
              </select>
              <select
                sx={{ m: 1 }}
                required
              // eslint-disable-next-line camelcase
                value={project_id}
                onChange={handleChange}
                name="project_id"
                className="interventions__select"
              >
                <option value="" disabled selected>Choisir un projet</option>
                {
                    projects
                      .filter((project) => Number(project.client_id) === Number(selectedClient))
                      .map((project) => (
                        <option
                          key={project.id}
                          value={project.id}
                        >
                          {project.title}
                        </option>
                      ))
                }
              </select>
              <select
                sx={{ m: 1 }}
                required
              // eslint-disable-next-line camelcase
                value={address_id}
                onChange={handleChange}
                name="address_id"
                className="interventions__select"
              >
                <option value="" disabled selected>Choisir une addresse</option>
                {
                    addresses
                      .filter((address) => Number(address.client_id) === Number(selectedClient))
                      .map((address) => (
                        <option
                          key={address.id}
                          value={address.id}
                        >
                          {address.number} {address.street} {address.postal_code} {address.city}
                        </option>
                      ))
                }
              </select>
              <TextField sx={{ m: 1, bgcolor: 'text.disabled' }} fullWidth type="submit" defaultValue="Envoyer" />
            </form>
            <Button className="modal-close1" onClick={handleCloseModal}>Fermer</Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Interventions;
