/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Dialog } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import Fab from '@mui/material/Fab';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DocumentsHeader from './DocumentsHeader';
// import './documents.scss';
import List from './ListDocuments';

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

  const StyledFab = styled(Fab)({
    position: 'fixed',
    zIndex: 1,
    bottom: 80,
    right: 25,
    margin: '0 auto',
  });
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

  const Input = styled('input')({
    display: 'none',
  });

  return (
    <Box
      sx={{
      // FIXME: régler la hauteur
        height: '100vh',
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
        <List input={inputText} />
      </div>
      <div>
        <StyledFab size="medium" color="secondary" aria-label="add">
          <AddIcon onClick={handleOpenModal} />
        </StyledFab>
      </div>
      <Dialog
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
              // onChange={handleChange}
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
              // onChange={handleChange}
              onChange={(event) => setDescription(event.target.value)}
            />
            {/* <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={(event) => setPictureFile(event.target.files[0])}
              />
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label> */}
            <TextField
              fullWidth
              sx={{ mb: 1 }}
              id="file"
              type="file"
              name="file"
              accept=".jpg, .jpeg, .png"
              // value={file}
              // onChange={handleChange}
              onChange={(event) => setPictureFile(event.target.files[0])}
            />
            <Box sx={{ mt: 1, mb: 1, minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Choisir un client</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={clients.id}
                  label="Choisir un client"
                >
                  {clients.map((clientt) => (
                    <MenuItem key={clientt.id} value={`${clientt.firstname} ${clientt.lastname}`}>{`${clientt.firstname} ${clientt.lastname}`}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Select
              fullWidth
              sx={{
                mb: 1,
              }}
              // required
              // eslint-disable-next-line camelcase
              value={projects.id}
              // onChange={handleChange}
              onChange={(event) => setProject(event.target.value)}
              name="project_id"
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
            </Select>
            <Select
              fullWidth
              sx={{
                mb: 1,
              }}
              // required
              // eslint-disable-next-line camelcase
              value={inters.id}
              // onChange={handleChange}
              onChange={(event) => setIntervention(event.target.value)}
              name="intervention_id"
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
            </Select>
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
