/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import axios from 'axios';

// import data from './data.json';

import './style.scss';

function ListInterventions() {
  // créer un thème personnalisé pour les status
  // définir nom des status
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');
  const loadData = async () => {
    try {
      const response = await axios.get('https://majordome-api.herokuapp.com/api/interventions/today', {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ul className="client-listIntervention">
      {data.map((item) => (
        <Link to={`/interventions/${item.id}`}>
          <li key={item.id}>{item.title}-{item.description}-{new Date(item.date).toLocaleDateString()}-{new Date(item.date).toLocaleTimeString()}<Chip size="small" label={item.status} color="primary" /></li>
        </Link>
      ))}
    </ul>
  );
}

export default ListInterventions;
