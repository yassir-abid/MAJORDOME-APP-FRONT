/* eslint-disable import/no-extraneous-dependencies */
import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import InterventionsReportHeader from './InterventionsReportHeader';
import './interventionsReport.scss';

function InterventionsReport() {
  const { id } = useParams();

  const [data, setData] = useState();
  const [beforePictures, setBeforePictures] = useState('');
  const [afterPictures, setAfterPictures] = useState('');

  const token = localStorage.getItem('token');

  const infosReport = async () => {
    try {
      const response = await axios.get(`https://majordome-api.herokuapp.com/api/interventions/${id}/report`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log(response.data);
      setData(response.data);
      setBeforePictures(response.data.pictures.filter((picture) => picture.status === 'Avant'));
      setAfterPictures(response.data.pictures.filter((picture) => picture.status === 'Après'));
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };
  useEffect(() => {
    infosReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div className="interventionsReport">
      <InterventionsReportHeader />
      <main className="interventionsReport-main">
        <div className="interventionsReport-container_list">
          <TextField
            sx={{ mt: 1, mb: 1 }}
            fullWidth
            id="project"
            name="project"
            label="Nom du projet"
            value={data.project.title}
          />
          <TextField
            sx={{ mt: 1, mb: 1 }}
            fullWidth
            id="client"
            name="client"
            label="Nom du client"
            value={`${data.client.firstname} ${data.client.lastname}`}
          />
          <TextField
            sx={{ mt: 1, mb: 1 }}
            fullWidth
            id="title"
            name="title"
            label="Nom de l'intervention"
            value={data.title}
          />
          <TextField
            id="date"
            label="Date de début"
            value={new Date(data.date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
            variant="standard"
          />
          <TextField
            id="end_date"
            label="Date de fin"
            value={new Date(data.end_date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
            variant="standard"
          />
          <div className="interventionsReport-main_li">
            <li className="interventionsReport-main_li">
              <p>Avant</p>
              <CardMedia
                component="img"
                // height="140"
                src={beforePictures[0].path}
                alt={beforePictures[0].title}
              />
            </li>
            <li className="interventionsReport-main_li">
              <p>Après</p>
              <CardMedia
                component="img"
                // height="140"
                src={afterPictures[0].path}
                alt={afterPictures[0].title}
              />
            </li>
          </div>

          <TextField
            sx={{ mt: 1, mb: 1 }}
            fullWidth
            id="report"
            name="report"
            label="Rapport"
            value={data.report}
          />
        </div>
      </main>
    </div>
  );
}

export default InterventionsReport;
