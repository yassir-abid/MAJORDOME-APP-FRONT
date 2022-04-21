/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
// import Client from './Client';

import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
// import data from './data.json';

import './style.scss';

function ListProjets({ projects }) {
  // créer un thème personnalisé pour les status
  // définir nom des status

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <List>
        {projects.map((project) => (
          <ListItem>
            <Link to={`/projects/${project.id}`} key={project.id}>
              <ListItemText
                primary={project.title}
                secondary={project.description}
              />
              <Chip size="small" label={project.status} color="primary" />

            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default ListProjets;
