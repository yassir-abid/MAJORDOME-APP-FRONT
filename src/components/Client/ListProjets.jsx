/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
// import Client from './Client';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { createTheme } from '@mui/material/styles';
// import data from './data.json';

import './style.scss';

function ListProjets({ projects }) {
  // créer un thème personnalisé pour les status
  // définir nom des status

  return (
    <ul className="client-listProjets">
      {projects.map((project) => (
        <Link to={`/projets/${project.id}`} key={project.id}>
          <li>{project.title}-{project.description}-{project.status} <Chip size="small" label={project.status} color="primary" /></li>
        </Link>
      ))}
    </ul>
  );
}

export default ListProjets;
