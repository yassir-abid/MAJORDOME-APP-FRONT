/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

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

import { changeValue, addProject } from '../../actions/project';
import ProjectsHeader from './ProjectsHeader';
import ListProjects from './ListProjects';
import baseUrl from '../../utils';

function Projects() {
  const [clients, setClients] = useState([]);
  const token = localStorage.getItem('token');
  const loadClients = async () => {
    try {
      const response = await axios.get(`${baseUrl}/clients`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      setClients(response.data);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  const [projects, setProjects] = useState([]);
  const loadData = async () => {
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

  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const addProjectToState = (project) => {
    setProjects([...projects, project]);
    handleCloseModal();
  };

  useEffect(() => {
    loadClients();
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [inputText, setInputText] = useState('');
  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const {
    title, description, comments, client_id,
  } = useSelector((state) => state.project);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(changeValue(e.target.value, e.target.name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProject(addProjectToState));
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
      <ProjectsHeader />
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
        <ListProjects input={inputText} projects={projects} />
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
                Nouveau projet
              </Typography>
              <label>
                <TextField
                  required
                  sx={{ mt: 3, mb: 1 }}
                  fullWidth
                  label="Nom du projet"
                  type="text"
                  name="title"
                  placeholder="Nom du projet"
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

              <Box sx={{ mt: 1, mb: 1 }}>
                <FormControl fullWidth>
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

export default Projects;
