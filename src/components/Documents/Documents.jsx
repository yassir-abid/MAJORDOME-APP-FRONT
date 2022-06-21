/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import { React, useEffect, useState } from 'react';
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
import ListDocuments from './ListDocuments';

function Documents() {
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [inters, setInters] = useState([]);
  const [docs, setDocs] = useState([]);

  const token = localStorage.getItem('token');
  const loadData = async () => {
    try {
      const response = await axios.get('https://majordome-api.herokuapp.com/api/documents', {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
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
      formData.append('client_id', client);
    }
    if (project !== '') {
      formData.append('project_id', project);
    }
    if (intervention !== '') {
      formData.append('intervention_id', intervention);
    }
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
      loadData();
      handleCloseModal();
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  return (
    <Box>
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

            <TextField
              fullWidth
              sx={{ mb: 1 }}
              id="file"
              type="file"
              name="file"
              accept=".jpg, .jpeg, .png"
              onChange={(event) => setFile(event.target.files[0])}
            />

            <Box sx={{ mt: 1, mb: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Choisir un client</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={client}
                  onChange={(event) => setClient(event.target.value)}
                  label="Choisir un client"
                >
                  <MenuItem value=""><Typography sx={{ fontStyle: 'italic' }}>Aucun</Typography></MenuItem>
                  {clients.map((element) => (
                    <MenuItem key={element.id} value={element.id}>{`${element.lastname} ${element.firstname}`}</MenuItem>
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
                  value={project}
                  onChange={(event) => setProject(event.target.value)}
                  label="Choisir un projet"
                >
                  <MenuItem value=""><Typography sx={{ fontStyle: 'italic' }}>Aucun</Typography></MenuItem>
                  {
                    client
                      ? (
                        projects
                          .filter((element) => Number(element.client_id) === Number(client))
                          .map((element) => (
                            <MenuItem key={element.id} value={element.id}>{element.title}</MenuItem>
                          ))
                      )
                      : (projects
                        .map((element) => (
                          <MenuItem key={element.id} value={element.id}>{element.title}</MenuItem>
                        ))
                      )
                  }
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mt: 1, mb: 1 }}>
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
                    project
                      ? (
                        inters
                          .filter((element) => Number(element.project_id) === Number(project))
                          .map((element) => (
                            <MenuItem key={element.id} value={element.id}>{element.title}</MenuItem>
                          ))
                      )
                      : (
                        client
                          ? (
                            inters
                              .filter((element) => Number(element.client.id) === Number(client))
                              .map((element) => (
                                <MenuItem key={element.id} value={element.id}>{element.title}</MenuItem>
                              ))
                          )
                          : (inters
                            .map((element) => (
                              <MenuItem key={element.id} value={element.id}>{element.title}</MenuItem>
                            ))
                          )
                      )
                  }
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
  );
}

export default Documents;
