/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { Dialog } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DocumentsHeader from './DocumentsHeader';
// import './documents.scss';
import ListDocuments from './ListDocuments';

function Documents() {
  const { id } = useParams();

  const token = localStorage.getItem('token');

  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [inters, setInters] = useState([]);
  const [selectedClient, setselectedClient] = useState('');
  const [docs, setDocs] = useState([]);

  const loadData = async () => {
    try {
      const response = await axios.get(`https://majordome-api.herokuapp.com/api/documents/interventions/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log('#documents#');
      console.log(response);
      setDocs(response.data);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  const loadInterventions = async () => {
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

  useEffect(() => {
    loadInterventions();
    loadClients();
    loadProjects();
    loadData();
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

  const StyledFab = styled(Fab)({
    position: 'fixed',
    zIndex: 1,
    bottom: 80,
    right: 25,
    margin: '0 auto',
  });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');
  const [client, setClient] = useState('');
  const [project, setProject] = useState('');
  const [intervention, setIntervention] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);
    if (client !== '') {
      formData.append('client_id', id);
    }
    if (project !== '') {
      formData.append('project_id', project);
    }
    formData.append('intervention_id', id);
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
      loadData();
      handleCloseModal();
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  return (
    <Box
      sx={{
      // FIXME: régler la hauteur
        // height: '100vh',
      }}
    >
      <DocumentsHeader />
      <div>
        <Box
          sx={{
            mt: 2,
            ml: 1,
            mr: 1,

          }}
        >
          <TextField
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            label="Search"
          />
        </Box>
        <ListDocuments input={inputText} docs={docs} />
      </div>
      <div>
        <StyledFab size="medium" color="secondary" aria-label="add">
          <AddIcon onClick={handleOpenModal} />
        </StyledFab>
      </div>

      {/* TODO: ici on rentre dans la modal */}
      <Dialog
        disableEnforceFocus
        fullScreen
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{ p: 1 }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              required
              sx={{ mb: 1 }}
              fullWidth
              label="Titre du document"
              type="text"
              name="title"
              placeholder="Titre du document"
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

            {/* Choisir un fichier */}
            <TextField
              fullWidth
              sx={{ mb: 1 }}
              id="file"
              type="file"
              name="file"
              accept=".jpg, .jpeg, .png"
              onChange={(event) => setFile(event.target.files[0])}
            />

            {/* Choisir un client */}
            <Box sx={{ mt: 1, mb: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Choisir un client</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={client}
                  onChange={(event) => {
                    setClient(event.target.value);
                    setselectedClient(event.target.value);
                  }}
                  label="Choisir un client"
                >
                  <MenuItem value=""><Typography sx={{ fontStyle: 'italic' }}>Aucun</Typography></MenuItem>
                  {clients.map((clientt) => (
                    <MenuItem key={clientt.id} value={clientt.id}>{`${clientt.firstname} ${clientt.lastname}`}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Choisir un projet */}
            <Box sx={{ mt: 1, mb: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Choisir un projet</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={project}
                  onChange={(event) => setProject(event.target.value)}
                  label="Choisir un projet"
                >
                  <MenuItem value=""><Typography sx={{ fontStyle: 'italic' }}>Aucun</Typography></MenuItem>
                  {
                    selectedClient
                      ? (
                        projects
                          .filter((projectt) => Number(projectt.client_id) === Number(id))
                          .map((projectt) => (
                            <MenuItem key={projectt.id} value={projectt.id}>{projectt.title}</MenuItem>
                          ))
                      )
                      : (projects
                        .map((projectt) => (
                          <MenuItem key={projectt.id} value={projectt.id}>{projectt.title}</MenuItem>
                        ))
                      )
                  }
                </Select>
              </FormControl>
            </Box>

            {/* Choisir une intervention */}
            {/* <Box sx={{ mt: 1, mb: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Choisir une intervention</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={intervention}
                  label="Choisir une intervention"
                  onChange={(event) => setIntervention(event.target.value)}
                >
                  <MenuItem value=""><Typography sx={{ fontStyle: 'italic' }}>Aucun</Typography></MenuItem>
                  {
                    selectedClient
                      ? (
                        inters
                          .filter((inter) => Number(inter.project.client_id) === Number(id))
                          .map((inter) => (
                            <MenuItem key={inter.id} value={inter.id}>{inter.title}</MenuItem>
                          ))
                      )
                      : (
                        inters
                          .map((inter) => (
                            <MenuItem key={inter.id} value={inter.id}>{inter.title}</MenuItem>
                          ))
                      )
                  }
                </Select>
              </FormControl>
            </Box> */}

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
  );
}

export default Documents;
