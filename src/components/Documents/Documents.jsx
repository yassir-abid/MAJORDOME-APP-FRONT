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
// import { addDocument, changeValue } from '../../actions/document';

function Documents() {
  const [inters, setInters] = useState([]);

  //   const {
  //     // eslint-disable-next-line camelcase
  //     title, description, path, client_id, project_id, intervention_id,
  //   } = useSelector((state) => state.document);

  const [clients, setClients] = useState([]);
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
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  //   console.log('clients', clients);
  //   console.log('selectedClient', selectedClient);
  //   console.log('intervention', inters);

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
  // console.log('projects', projects);

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

  // const dispatch = useDispatch();

  //   const handleChange = (e) => {
  //     if (e.target.name === 'client_id') {
  //       setselectedClient(e.target.value);
  //     }
  //     dispatch(changeValue(e.target.value, e.target.name));
  //   };

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setPictureFile] = useState('');
  const [client, setClient] = useState('');
  const [project, setProject] = useState('');
  const [intervention, setIntervention] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // dispatch(addDocument());
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);
    formData.append('client_id', client);
    formData.append('project_id', project);
    formData.append('intervention_id', intervention);
    try {
      const response = await axios({
        method: 'post',
        url: 'https://majordome-api.herokuapp.com/api/documents',
        data: formData,
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  console.log(client);

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
          <form className="project__add" onSubmit={handleSubmit}>
            <TextField
              required
              sx={{ m: 1 }}
              fullWidth
              label="Titre du document"
              type="text"
              name="title"
              placeholder="Titre du document"
              value={title}
              // onChange={handleChange}
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
              // onChange={handleChange}
              onChange={(event) => setDescription(event.target.value)}
            />
            <TextField
              id="file"
              type="file"
              name="file"
              accept=".jpg, .jpeg, .png"
              // value={file}
              // onChange={handleChange}
              onChange={(event) => setPictureFile(event.target.files[0])}
            />
            <select
              sx={{ m: 1 }}
              // required
                // eslint-disable-next-line camelcase
              value={clients.id}
              // onChange={handleChange}
              onChange={(event) => setClient(event.target.value)}
              name="client_id"
              className="interventions__select"
            >
              <option value="" disabled selected>Choisir un client</option>
              {clients.map((clientt) => (
                <option
                  key={clientt.id}
                  value={clientt.id}
                >
                  {clientt.firstname} {clientt.lastname}
                </option>
              ))}
            </select>
            <select
              sx={{ m: 1 }}
              // required
              // eslint-disable-next-line camelcase
              value={projects.id}
              // onChange={handleChange}
              onChange={(event) => setProject(event.target.value)}
              name="project_id"
              className="interventions__select"
            >
              <option value="" disabled selected>Choisir un projet</option>
              {
                    // projects
                      // .filter((projectt) => Number(projectt.client_id) === Number(setClient))
                      projects.map((projectt) => (
                        <option
                          key={projectt.id}
                          value={projectt.id}
                        >
                          {projectt.title}
                        </option>
                      ))
                }
            </select>
            <select
              sx={{ m: 1 }}
              // required
              // eslint-disable-next-line camelcase
              value={inters.id}
              // onChange={handleChange}
              onChange={(event) => setIntervention(event.target.value)}
              name="intervention_id"
              className="interventions__select"
            >
              <option value="" disabled selected>Choisir une intervention</option>
              {
                    // inters
                      // eslint-disable-next-line max-len
                      // .filter((inter) => Number(inter.project.client_id) === Number(selectedClient))
                      inters.map((inter) => (
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
