/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';

import data from './ListData.json';

function ListInterventions({ input }) {
  const [inters, setInters] = useState([]);
  const token = localStorage.getItem('token');
  const loadData = async () => {
    try {
      const response = await axios.get('https://majordome-api.herokuapp.com/api/interventions', {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log('get interventions', response.data);
      setInters(response.data);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // create a new array by filtering the original array
  const filteredInters = inters.filter((el) => {
    // if no input the return the original
    if (input === '') {
      return el;
    }
    // return the item which contains the user input

    return el.title.toLowerCase().includes(input)
    || el.status.toLowerCase().includes(input);
  });
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mr: 1,
        ml: 1,
      }}
    >
      <List>
        {filteredInters.map((intervention) => (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            '& > :not(style)': {
              mb: 1,
              height: '100%',
            },
          }}
          >
            {/* <Paper elevation={3}> */}
            <Link to={`/interventions/${intervention.id}`} key={intervention.id}>
              <ListItem
                sx={{
                  borderRadius: '5px',
                  border: 1,
                  boxShadow: 3,
                  borderColor: 'primary.light',
                  bgcolor: 'white',
                }}
              >
                <ListItemText
                  primary={`${intervention.title}`}
                />
                <Chip size="small" sx={{ minWidth: 90 }} label={intervention.status} color="primary" />
              </ListItem>
            </Link>
            {/* </Paper> */}
          </Box>
        ))}
      </List>
    </Box>
  );
}

export default ListInterventions;
