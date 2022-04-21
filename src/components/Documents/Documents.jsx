/* eslint-disable import/no-extraneous-dependencies */
import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import DocumentsHeader from './DocumentsHeader';
import './documents.scss';
import List from './List';

function Documents() {
  const [inters, setInters] = useState([]);

  const {
    // eslint-disable-next-line camelcase
    title, description, date, end_date, status, comments, client_id, project_id, inter_id,
  } = useSelector((state) => state.intervention);

  const [clients, setClients] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedClient, setselectedClient] = useState({});

  const token = localStorage.getItem('token');

  const loadData = async () => {
    try {
      const response = await axios.get('https://majordome-api.herokuapp.com/api/interventions', {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log('get interventions', response.data);
      setInters(response.data);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

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
  console.log('intervention', inters);

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
    loadData();
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

  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.name === 'client_id') {
      setselectedClient(e.target.value);
    }
    // dispatch(changeValue(e.target.value, e.target.name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(addIntervention());
  };

  return (
    <div className="documents">
      <DocumentsHeader />
      <div className="documents-main">
        <TextField
          className="documents-searchBar"
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        />
        <List input={inputText} />
      </div>
      <div className="documents__add__document">
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
          className="projects-modal"
        >
          <form className="project__add">
            <TextField
              required
              sx={{ m: 1 }}
              fullWidth
              label="Titre du document"
              type="text"
              name="title"
              placeholder="Titre du document"
            //   value={title}
            //   onChange={handleChange}
            />
            <TextField
              sx={{ m: 1 }}
              id="outlined-multiline-static"
              label="Description"
              fullWidth
              multiline
              rows={4}
              name="description"
              placeholder="Description"
            //   value={description}
            //   onChange={handleChange}
            />
            <TextField
              type="file"
              name="upload document"
            //   value={comments}
            //   onChange={handleChange}
            />
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
                      .filter((project) => Number(project.client.id) === Number(selectedClient))
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
              value={inter_id}
              onChange={handleChange}
              name="inter_id"
              className="interventions__select"
            >
              <option value="" disabled selected>Choisir une intervention</option>
              {
                    inters
                      .filter((inter) => Number(inter.client_id) === Number(selectedClient))
                      .map((inter) => (
                        <option
                          key={inter.id}
                          value={inter.id}
                        >
                          {inter.title}
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
  );
}

export default Documents;
