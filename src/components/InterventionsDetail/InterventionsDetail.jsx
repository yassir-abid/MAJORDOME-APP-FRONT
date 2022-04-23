/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import { React, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Icon } from '@iconify/react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers';

// import InterventionsDetailHeader from './InterventionsDetailHeader';
import './interventionsDetail.scss';

function InterventionsDetail() {
  const [value, setValue] = useState('');

  // récupère l'id de la route
  const { id } = useParams();

  // params axios route GET
  const [infos, setInfos] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [comments, setComments] = useState('');
  const [project_id, setProjectId] = useState('');
  const [address_id, setAddressId] = useState('');

  const token = localStorage.getItem('token');
  const infoIntervention = async () => {
    try {
      const response = await axios.get(`https://majordome-api.herokuapp.com/api/interventions/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log(response.data);
      setInfos(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setDate(response.data.date);
      setEndDate(response.data.end_date);
      setStatus(response.data.status);
      setComments(response.data.comments);
      setProjectId(response.data.project_id);
      setAddressId(response.data.address_id);
      console.log(infos);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  const navigate = useNavigate();

  // function to delete one project with his id
  function interventionDelete() {
    if (window.confirm('Etes vous sur de vouloir supprimer ce projet ?')) {
      navigate('/interventions');
      const interventionToDelete = async () => {
        try {
          const response = await axios.delete(`https://majordome-api.herokuapp.com/api/interventions/${id}`, {
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

  // function to edit one project with his id
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
  const [selectedClient, setselectedClient] = useState({});

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
    <div className="interventionsDetail">
      <header className="interventionsDetail-header">
        <div className="interventionsDetail-header_notify">
          <Icon icon="ri:delete-bin-2-fill" width="30" height="30" onClick={() => interventionDelete(infos.id)} />
        </div>
        <div className="interventions-header_title">
          <h1> {infos.title}</h1>
        </div>
        <div className="interventionsDetail-header_avatar">
          <Icon icon="bxs:edit-alt" width="30" height="30" onClick={handleOpenModal} />
        </div>
      </header>
      <main className="interventionsDetail-main">
        <div className="interventionsDetail-container_list">
          <div> <Chip label={infos.status} color="success" />
          </div>
          <ul>
            <li className="interventionsDetail-main_li">
              <p>Nom du projet: {infos.project.title} </p>
            </li>
            <li className="interventionsDetail-main_li">
              <p>Nom du client: {infos.client.firstname} {infos.client.lastname}</p>
            </li>
            <li className="interventionsDetail-main_li">
              <div>
                <p>Description</p>
                <TextField
                  id="description"
                  // label="Description"
                  multiline
                  maxRows={4}
                  value={infos.description}
                  // onChange={handleChange}
                  variant="standard"
                />
              </div>
            </li>
            <li className="interventionsDetail-main_li">
              <div>
                <p>Date de début</p>
                <TextField
                  id="date"
                  value={new Date(infos.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                  // onChange={handleChange}
                  variant="standard"
                />
              </div>
            </li>
            <li className="interventionsDetail-main_li">
              <div>
                <p>Date de fin</p>
                <TextField
                  id="end_date"
                  value={new Date(infos.end_date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                  // onChange={handleChange}
                  variant="standard"
                />
              </div>
            </li>
            <li className="interventionsDetail-main_li">
              <div>
                <p>Commentaire</p>
                <TextField
                  id="comments"
                  // label="commentaire"
                  multiline
                  maxRows={4}
                  value={infos.comments}
                  // onChange={handleChange}
                  variant="standard"
                />
              </div>
            </li>
            <li className="interventionsDetail-main_li">
              <Link to={`/interventions/${id}/report`}>
                <Button>Rapport d intervention</Button>
              </Link>
            </li>
            <li className="interventionsDetail-main_li">
              <Link to={`/documents/interventions/${id}`}>
                <Button>Documents</Button>
              </Link>
            </li>
            <li className="interventionsDetail-main_li">
              <Link to={`/interventions/${id}/notifications_list`}>
                <Button>Notifs</Button>
              </Link>
            </li>
          </ul>
        </div>
      </main>
      {/* modal to edit project */}
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
            onSubmit={editIntervention}
          >

            <TextField
              sx={{ m: 1 }}
              fullWidth
              label="Nom de l'intervention"
              type="text"
              name="title"
              placeholder="Nom de l'intervention"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
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
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <Stack spacing={3} sx={{ m: 1 }}>
                <MobileDateTimePicker
                  label="Date de début"
                  name="date"
                  value={date}
                  onChange={handleChangeStartDate}
                  inputFormat="dd/MM/yyyy hh:mm a"
                  renderInput={(params) => <TextField {...params} />}
                />
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
            <select
              required
              // eslint-disable-next-line camelcase
              value={status}
              onChange={(event) => setStatus(event.target.value)}
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
              onChange={(event) => setComments(event.target.value)}
            />

            <select
              sx={{ m: 1 }}
                // eslint-disable-next-line camelcase
              value={value}
              onChange={(event) => setselectedClient(event.target.value)}
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
              // eslint-disable-next-line camelcase
              value={project_id}
              onChange={(event) => setProjectId(event.target.value)}
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
              // eslint-disable-next-line camelcase
              value={address_id}
              onChange={(event) => setAddressId(event.target.value)}
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
  );
}

export default InterventionsDetail;
