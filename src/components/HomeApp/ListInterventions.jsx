/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

// import data from './data.json';

// import './style.scss';

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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mr: 2,
        ml: 2,
      }}
    >
      <List>
        {data.map((item) => (
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              mb: 2,
              // width: '100%',
              height: '100%',
            },
          }}
          >
            <Paper elevation={3}>
              <ListItem>
                <Link to={`/interventions/${item.id}`} key={item.id}>

                  <ListItemText
                    primary={item.title}
                    secondary={item.description}
                  />
                  <ListItemText
                    primary={new Date(item.date).toLocaleDateString()}
                  />
                  <ListItemText
                    primary={new Date(item.date).toLocaleTimeString()}
                  />
                  <Chip size="small" label={item.status} color="primary" />
                </Link>
              </ListItem>
            </Paper>
          </Box>
        ))}
      </List>
    </Box>
  );
}

export default ListInterventions;
