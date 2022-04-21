/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import { React, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import { Icon } from '@iconify/react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './interventionsReport.scss';

function InterventionsReport() {
  // récupère l'id de la route
  const { id } = useParams();

  // params axios route GET
  const [infos, setInfos] = useState('');
  const [beforePictures, setBeforePictures] = useState([]);
  const [afterPictures, setAfterPictures] = useState([]);
  const [report, setReport] = useState('');

  const token = localStorage.getItem('token');
  const infoReport = async () => {
    try {
      const response = await axios.get(`https://majordome-api.herokuapp.com/api/interventions/${id}/report`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      const filtredBeforePictures = response.data.pictures.filter((picture) => picture.status === 'Avant');
      const filtredAfterPictures = response.data.pictures.filter((picture) => picture.status === 'Après');

      setInfos(response.data);
      setReport(response.data.report);
      setBeforePictures(filtredBeforePictures);
      setAfterPictures(filtredAfterPictures);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const editIntervention = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(`https://majordome-api.herokuapp.com/api/interventions/${id}`, {
        report,
      }, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log(response.data);
      infoReport();
      handleCloseModal();
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  const pictureDelete = async (pictureId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette photo ?')) {
      const pictureToDelete = async () => {
        try {
          await axios.delete(`https://majordome-api.herokuapp.com/api/interventions/pictures/${pictureId}`, {
            headers: {
              Authorization: `bearer ${token}`,
            },
          });

          infoReport();
        } catch (error) {
          console.log('Erreur de chargement', error);
        }
      };

      pictureToDelete();
    }
  };

  const handleDeletePicture = (pictureId) => {
    pictureDelete(pictureId);
  };

  useEffect(() => {
    infoReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!infos || !beforePictures || !afterPictures) {
    return null;
  }

  return (
    <div className="interventionsDetail">
      <header className="interventionsReport-header">

        <div className="interventionsReport-header_title">
          <h1>{infos.title}</h1>
        </div>

        <div className="interventionsReport-header_avatar">
          <Icon icon="bxs:edit-alt" width="30" height="30" onClick={handleOpenModal} />
        </div>
      </header>
      <main className="interventionsReport-main">
        <div className="interventionsReport-container_list">
          {/* <ul>
            <li className="interventionsReport-main_li">
              <p>Nom du projet: {infos.project.title} </p>
            </li>
            <li className="interventionsReport-main_li">
              <p>Nom du client: {infos.client.firstname} {infos.client.lastname}</p>
            </li>
            <li className="interventionsReport-main_li">
              <p>Date de début : {new Date(infos.date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
              </p>
            </li>
            <li className="interventionsReport-main_li">
              <p>Date de fin : {new Date(infos.end_date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
              </p>
            </li>
          </ul> */}
          <TextField
            sx={{ mt: 1, mb: 1 }}
            fullWidth
            id="project"
            name="project"
            label="Nom du projet"
            value={infos.project.title}
          />
          <TextField
            sx={{ mt: 1, mb: 1 }}
            fullWidth
            id="client"
            name="client"
            label="Nom du client"
            value={`${infos.client.firstname} ${infos.client.lastname}`}
          />
          <TextField
            sx={{ mt: 1, mb: 1 }}
            fullWidth
            id="date"
            label="Date de début"
            value={new Date(infos.date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
          />
          <TextField
            sx={{ mt: 1, mb: 1 }}
            fullWidth
            id="end_date"
            label="Date de fin"
            value={new Date(infos.end_date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
          />
          <TextField
            sx={{ mt: 1, mb: 1 }}
            fullWidth
            id="report"
            name="report"
            label="Rapport"
            value={infos.report}
          />
          {/* <div className="interventionsReport-pictures">
            <div className="interventionsReport-pictures_div">
              <p>{beforePictures[0].title} - {beforePictures[0].status}</p>
              <a href={beforePictures[0].path} className="interventionsReport-pictures_card" target="_blank" rel="noreferrer">
                <CardMedia
                  component="img"
                                    //   height="140"
                  src={beforePictures[0].path}
                  alt={beforePictures[0].title}
                />
              </a>
            </div>
            <div className="interventionsReport-pictures_div">
              <p>{afterPictures[0].title} - {afterPictures[0].status}</p>
              <a href={afterPictures[0].path} className="interventionsReport-pictures_card" target="_blank" rel="noreferrer">
                <CardMedia
                  component="img"
                                    //   height="140"
                  src={afterPictures[0].path}
                  alt={afterPictures[0].title}
                />
              </a>
            </div> */}

          <Box sx={{ width: '90%', m: 'auto' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ m: 1 }}>
              <Typography variant="h6" component="div" gutterBottom sx={{ mb: 0 }}>
                Avant
              </Typography>
              {/* <Input accept="image/*" id="icon-button-file" type="file" /> */}
              <IconButton color="primary" aria-label="upload picture" component="span" sx={{ p: 0 }}>
                <PhotoCamera />
              </IconButton>
            </Stack>
            <Carousel autoPlay={false} fullHeightHover={false}>
              {
                beforePictures.map((item) => (
                  <div>
                    <Card>
                      <CardMedia key={item.id} component="img" src={item.path} />
                      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" component="div" gutterBottom sx={{ mb: 0 }}>
                          {item.title}
                        </Typography>
                        <IconButton color="primary" aria-label="delete-before-picture" component="span" sx={{ p: 0 }} onClick={() => handleDeletePicture(item.id)}>
                          <DeleteIcon sx={{ fontSize: 30 }} />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </div>
                ))
            }
            </Carousel>
            <Typography variant="h6" component="div" gutterBottom>
              Après
            </Typography>
            <Carousel autoPlay={false} fullHeightHover={false}>
              {
                afterPictures.map((item) => (
                  <div>
                    <Card>
                      <CardMedia key={item.id} component="img" src={item.path} />
                      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" component="div" gutterBottom sx={{ mb: 0 }}>
                          {item.title}
                        </Typography>
                        <IconButton aria-label="delete-after-picture" sx={{ p: 0 }} onClick={() => handleDeletePicture(item.id)}>
                          <DeleteIcon sx={{ fontSize: 30 }} />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </div>
                ))
            }
            </Carousel>
          </Box>

        </div>
      </main>
      <Modal
        className=""
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="interventionsReport-modal"
        >
          <h1 className="interventionsReport__modal__title"> Rapport d&apos;intervention {infos.title} </h1>
          <form className="interventionsReport__add" onSubmit={editIntervention}>
            <div>
              <TextField
                required
                sx={{ m: 1 }}
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
            </div>
            <TextField sx={{ m: 1, bgcolor: 'text.disabled' }} fullWidth type="submit" defaultValue="Envoyer" />
          </form>
          <Button className="modal-close1" onClick={handleCloseModal}>Fermer</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default InterventionsReport;
