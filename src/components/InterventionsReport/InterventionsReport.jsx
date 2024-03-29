/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import { Dialog, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import baseUrl from '../../utils';

function InterventionsReport() {
  const { id } = useParams();

  const [infos, setInfos] = useState('');
  const [beforePictures, setBeforePictures] = useState([]);
  const [afterPictures, setAfterPictures] = useState([]);
  const [report, setReport] = useState('');
  const [secondaryText, setSecondaryText] = useState(false);

  const token = localStorage.getItem('token');
  const infoReport = async () => {
    try {
      const response = await axios.get(`${baseUrl}/interventions/${id}/report`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      const filtredBeforePictures = response.data.pictures.filter((picture) => picture.status === 'Avant');
      const filtredAfterPictures = response.data.pictures.filter((picture) => picture.status === 'Après');

      setInfos(response.data);
      setReport(response.data.report);
      if (!response.data.report) {
        setSecondaryText(true);
      }
      setBeforePictures(filtredBeforePictures);
      setAfterPictures(filtredAfterPictures);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  const [openReportModal, setOpenReportModal] = useState(false);
  const handleOpenReportModal = () => setOpenReportModal(true);
  const handleCloseReportModal = () => setOpenReportModal(false);

  const editReport = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`${baseUrl}/interventions/${id}`, {
        report,
      }, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      infoReport();
      handleCloseReportModal();
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  const pictureDelete = async (pictureId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette photo ?')) {
      const pictureToDelete = async () => {
        try {
          await axios.delete(`${baseUrl}/interventions/pictures/${pictureId}`, {
            headers: {
              Authorization: `bearer ${token}`,
            },
          });
        } catch (error) {
          console.log('Erreur de chargement', error);
        }
      };

      pictureToDelete();
      infoReport();
    }
  };

  const handleDeletePicture = (pictureId) => {
    pictureDelete(pictureId);
  };

  const [file, setPictureFile] = useState('');
  const [title, setPictureTitle] = useState('');
  const [status, setPictureStatus] = useState('');

  // to setPictureStatus when picture modal is opened
  const before = 'Avant';
  const after = 'Après';

  const [openPictureModal, setOpenPictureModal] = useState(false);
  const handleOpenPictureModal = (pictureStatus) => {
    setPictureStatus(pictureStatus);
    setOpenPictureModal(true);
  };
  const handleClosePictureModal = () => setOpenPictureModal(false);

  const addPicture = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);
    formData.append('status', status);
    try {
      await axios({
        method: 'post',
        url: `${baseUrl}/interventions/${id}/pictures`,
        data: formData,
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      infoReport();
      handleClosePictureModal();
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  useEffect(() => {
    infoReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!infos || !beforePictures || !afterPictures) {
    return null;
  }

  return (
    <Box sx={{ minHeight: '90vh', pb: '5rem' }}>
      <Box>
        <Box sx={{
          bgcolor: 'primary.main',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomLeftRadius: '17px',
          borderBottomRightRadius: '17px',
          height: 60,
          pl: 1,
          pr: 1,
          pt: 1,
        }}
        >
          <Typography variant="h5" gutterBottom component="div" sx={{ color: 'white' }}>
            Rapport
          </Typography>
          <Fab size="small" color="secondary" aria-label="edit">
            <EditIcon
              onClick={handleOpenReportModal}
            />
          </Fab>
        </Box>
      </Box>
      <Box>
        <Box
          component="form"
          sx={{
            m: 1,
          }}
          noValidate
          autoComplete="off"
        >
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            '& > :not(style)': {
              height: '100%',
            },
          }}
          >
            <Typography>Projet</Typography>
            <ListItem
              key={infos.project.id}
              sx={{
                mb: 1,
                borderRadius: '5px',
                border: 1,
                boxShadow: 3,
                borderColor: 'primary.light',
                bgcolor: 'white',
              }}
            >
              <ListItemText
                primary={`${infos.project.title}`}
              />
            </ListItem>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            '& > :not(style)': {
              height: '100%',
            },
          }}
          >
            <Typography>Client</Typography>
            <ListItem
              key={infos.client.id}
              sx={{
                mb: 1,
                borderRadius: '5px',
                border: 1,
                boxShadow: 3,
                borderColor: 'primary.light',
                bgcolor: 'white',
              }}
            >
              <ListItemText
                primary={`${infos.client.lastname} ${infos.client.firstname}`}
              />
            </ListItem>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            '& > :not(style)': {
              height: '100%',
            },
          }}
          >
            <Typography>Date de début</Typography>
            <ListItem
              key={infos.date}
              sx={{
                mb: 1,
                borderRadius: '5px',
                border: 1,
                boxShadow: 3,
                borderColor: 'primary.light',
                bgcolor: 'white',
              }}
            >
              <TextField
                id="date"
                value={new Date(infos.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
                variant="standard"
              />
            </ListItem>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            '& > :not(style)': {
              height: '100%',
            },
          }}
          >
            <Typography>Date de fin</Typography>
            <ListItem
              key={infos.end_date}
              sx={{
                mb: 1,
                borderRadius: '5px',
                border: 1,
                boxShadow: 3,
                borderColor: 'primary.light',
                bgcolor: 'white',
              }}
            >
              <TextField
                id="end_date"
                value={new Date(infos.end_date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
                variant="standard"
              />
            </ListItem>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            '& > :not(style)': {
              height: '100%',
            },
          }}
          >
            <Typography>Rapport</Typography>
            <ListItem
              key={infos.report}
              sx={{
                mb: 1,
                borderRadius: '5px',
                border: 1,
                boxShadow: 3,
                borderColor: 'primary.light',
                bgcolor: 'white',
              }}
              multiline
              minRows={4}
              maxRows={6}
            >
              <ListItemText
                primary={infos.report ? `${infos.report}` : null}
                secondary={secondaryText ? 'Aucun rapport pour cette intervention' : null}
              />
            </ListItem>
          </Box>
          <Box sx={{ width: '90%', maxWidth: 700, m: 'auto' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ m: 1, mt: 3, mb: 3 }}>
              <Typography variant="h6" component="div" gutterBottom sx={{ mb: 0 }}>
                {before}
              </Typography>
              <IconButton aria-label="upload picture" component="span" sx={{ p: 0 }} onClick={() => handleOpenPictureModal(before)}>
                <PhotoCamera />
              </IconButton>
            </Stack>
            <Carousel dynamicHeight autoPlay showStatus={false}>
              {
                    beforePictures.length > 0
                      ? beforePictures.map((item) => (
                        <Card>
                          <CardActions sx={{
                            display: 'flex', justifyContent: 'space-between', pl: 2, pr: 2, pb: 0, pt: 0,
                          }}
                          >
                            <IconButton aria-label="delete-before-picture" component="span" sx={{ p: 0 }} onClick={() => handleDeletePicture(item.id)}>
                              <DeleteIcon sx={{ fontSize: 30 }} />
                            </IconButton>
                            <Typography variant="h6" component="div" gutterBottom sx={{ mb: 0 }}>
                              {item.title}
                            </Typography>
                            <a href={item.path} target="_blank" rel="noopener noreferrer">
                              <IconButton aria-label="open-before-picture" component="span" sx={{ p: 0 }}>
                                <OpenInNewIcon sx={{ fontSize: 30 }} />
                              </IconButton>
                            </a>
                          </CardActions>
                          <Box
                            component="img"
                            src={item.path}
                            sx={{
                              minHeight: '20vh', maxHeight: '50vh', width: 'auto !important', maxWidth: '100%',
                            }}
                          />
                        </Card>
                      ))
                      : (
                        <Card>
                          <CardMedia
                            sx={{
                              minHeight: '20vh', maxHeight: '30vh', width: 'auto !important', maxWidth: '100%',
                            }}
                            component="img"
                            src="https://cdn.pixabay.com/photo/2014/03/25/15/24/cinema-296751_960_720.png"
                          />
                        </Card>
                      )
                  }
            </Carousel>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ m: 1, mt: 0, mb: 3 }}>
              <Typography variant="h6" component="div" gutterBottom sx={{ mb: 0 }}>
                {after}
              </Typography>
              <IconButton aria-label="upload picture" component="span" sx={{ p: 0 }} onClick={() => handleOpenPictureModal(after)}>
                <PhotoCamera />
              </IconButton>
            </Stack>
            <Carousel dynamicHeight autoPlay showStatus={false}>
              {
                    afterPictures.length > 0
                      ? afterPictures.map((item) => (
                        <Card>
                          <CardActions sx={{
                            display: 'flex', justifyContent: 'space-between', pl: 2, pr: 2, pb: 0, pt: 0,
                          }}
                          >
                            <IconButton aria-label="delete-after-picture" component="span" sx={{ p: 0 }} onClick={() => handleDeletePicture(item.id)}>
                              <DeleteIcon sx={{ fontSize: 30 }} />
                            </IconButton>
                            <Typography variant="h6" component="div" gutterBottom sx={{ mb: 0 }}>
                              {item.title}
                            </Typography>
                            <a href={item.path} target="_blank" rel="noopener noreferrer">
                              <IconButton aria-label="open-before-picture" component="span" sx={{ p: 0 }}>
                                <OpenInNewIcon sx={{ fontSize: 30 }} />
                              </IconButton>
                            </a>
                          </CardActions>
                          <Box
                            component="img"
                            src={item.path}
                            sx={{
                              minHeight: '20vh', maxHeight: '50vh', width: 'auto !important', maxWidth: '100%',
                            }}
                          />
                        </Card>
                      ))
                      : (
                        <Card>
                          <CardMedia
                            sx={{
                              minHeight: '20vh', maxHeight: '30vh', width: 'auto !important', maxWidth: '100%',
                            }}
                            component="img"
                            src="https://cdn.pixabay.com/photo/2014/03/25/15/24/cinema-296751_960_720.png"
                          />
                        </Card>
                      )
                  }
            </Carousel>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          maxHeight: '100%',
        }}
      >
        <Dialog
          fullScreen
          open={openReportModal}
          onClose={handleCloseReportModal}
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
            <Typography variant="h5"> Modification du Rapport </Typography>
            <form onSubmit={editReport}>
              <TextField
                required
                sx={{ mt: 3, mb: 1 }}
                fullWidth
                multiline
                minRows={12}
                maxRows={14}
                label="Rapport"
                type="text"
                name="report"
                placeholder="Rapport"
                value={report}
                onChange={(event) => setReport(event.target.value)}
              />
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
                <CancelIcon fontSize="large" color="secondary" onClick={handleCloseReportModal}> </CancelIcon>
              </IconButton>
            </Box>
          </Box>
        </Dialog>
      </Box>

      <Box
        sx={{
          maxHeight: '100%',
        }}
      >
        <Dialog
          fullScreen
          open={openPictureModal}
          onClose={handleClosePictureModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '0%',
              left: '50%',
              transform: 'translate(-50%, 0%)',
              width: 700,
              maxWidth: '100%',
              height: 'auto',
              minHeight: '100vh',
              p: 1,
              bgcolor: 'background.default',
            }}
          >
            <Typography variant="h5">{infos.title} - Rapport </Typography>
            <form onSubmit={addPicture}>
              <TextField
                required
                sx={{ mt: 3, mb: 1 }}
                fullWidth
                label="Titre"
                type="text"
                name="title"
                placeholder="Titre de l'image"
                onChange={(event) => setPictureTitle(event.target.value)}
              />
              <TextField
                required
                sx={{ mb: 1 }}
                fullWidth
                id="file"
                type="file"
                accept=".jpg, .jpeg, .png"
                name="file"
                onChange={(event) => setPictureFile(event.target.files[0])}
              />
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
                <CancelIcon fontSize="large" color="secondary" onClick={handleClosePictureModal}> </CancelIcon>
              </IconButton>
            </Box>
          </Box>
        </Dialog>
      </Box>
    </Box>

  );
}

export default InterventionsReport;
