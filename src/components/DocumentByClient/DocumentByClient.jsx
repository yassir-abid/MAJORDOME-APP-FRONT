/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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

import { changeDocumentFieldValue, addDocument } from '../../actions/document';
import DocumentsHeader from './DocumentsHeader';
import ListDocuments from './ListDocuments';
import baseUrl from '../../utils';

function Documents() {
  const { id: clientID } = useParams();

  const token = localStorage.getItem('token');

  const [projects, setProjects] = useState([]);
  const [inters, setInters] = useState([]);
  const [docs, setDocs] = useState([]);

  const loadData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/documents/clients/${clientID}`, {
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
    loadInterventions();
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

  const {
    title, description, projectID, interventionID,
  } = useSelector((state) => state.document);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(changeDocumentFieldValue(e.target.value, e.target.name));
  };

  const [file, setFile] = useState('');

  const addDocumentToState = (document) => {
    setDocs([...docs, document]);
    handleCloseModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeDocumentFieldValue(clientID, 'clientID'));
    dispatch(addDocument(addDocumentToState, file));
  };

  return (
    <Box sx={{ minHeight: '90vh', pb: '5rem' }}>
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
          sx={{
            position: 'absolute',
            top: '0%',
            left: '50%',
            transform: 'translate(-50%, 0%)',
            width: '100%',
            p: 1,
            bgcolor: 'background.default',
            height: 'auto',
            minHeight: '100vh',
          }}
        >
          <form onSubmit={handleSubmit}>
            <Typography variant="h5">
              Nouveau document
            </Typography>
            <TextField
              required
              sx={{ mt: 3, mb: 1 }}
              fullWidth
              label="Titre du document"
              type="text"
              name="title"
              placeholder="Titre du document"
              value={title}
              onChange={handleChange}
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
              onChange={handleChange}
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
                <InputLabel id="demo-simple-select-label">Choisir un projet</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="projectID"
                  value={projectID}
                  onChange={handleChange}
                  label="Choisir un projet"
                >
                  <MenuItem value=""><Typography sx={{ fontStyle: 'italic' }}>Aucun</Typography></MenuItem>
                  {
                    projects
                      .filter((projectt) => Number(projectt.client_id) === Number(clientID))
                      .map((projectt) => (
                        <MenuItem key={projectt.id} value={projectt.id}>{projectt.title}</MenuItem>
                      ))
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
                  name="interventionID"
                  value={interventionID}
                  label="Choisir une intervention"
                  onChange={handleChange}
                >
                  <MenuItem value=""><Typography sx={{ fontStyle: 'italic' }}>Aucun</Typography></MenuItem>
                  {
                    inters
                      .filter((inter) => Number(inter.project.client_id) === Number(clientID))
                      .map((inter) => (
                        <MenuItem key={inter.id} value={inter.id}>{inter.title}</MenuItem>
                      ))
                  }
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
  );
}

export default Documents;
