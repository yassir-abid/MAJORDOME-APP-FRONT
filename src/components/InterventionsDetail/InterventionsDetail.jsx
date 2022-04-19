/* eslint-disable import/no-extraneous-dependencies */
import { React, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import InterventionsDetailHeader from './InterventionsDetailHeader';
import './interventionsDetail.scss';

function InterventionsDetail() {
  const [value, setValue] = useState('');

  // récupère l'id de la route
  const { id } = useParams();

  // params axios route GET
  const [infos, setInfos] = useState('');
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
      console.log(infos);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };
  useEffect(() => {
    infoIntervention();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [comValue, setComValue] = useState('');
  const comHandleChange = (event) => {
    setComValue(event.target.value);
  };

  // gestion du switch : readonly false or true
  const [editMode, setEditMode] = useState(false);
  const switchChange = (event) => {
    setEditMode(event.target.checked);
  };

  if (!infos) {
    return null;
  }

  return (
    <div className="interventionsDetail">
      <InterventionsDetailHeader nameIntervention={infos.title} />
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
              <Link to={`/interventions/${id}/documents_list`}>
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
    </div>
  );
}

export default InterventionsDetail;
