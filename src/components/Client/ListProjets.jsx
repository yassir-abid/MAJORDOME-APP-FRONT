/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { createTheme } from '@mui/material/styles';
import data from './data.json';
import './style.scss';

function ListProjets() {
  // créer un thème personnalisé pour les status
  // définir nom des status

  return (
    <ul className="client-listProjets">
      {data.map((item) => (
        <Link to={`/projets/${item.id}`}>
          <li key={item.id}>{item.title}-{item.description}-{item.status} <Chip size="small" label={item.status} color="primary" /></li>
        </Link>
      ))}
    </ul>
  );
}

export default ListProjets;
