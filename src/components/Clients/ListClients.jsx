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

// import data from './ListData.json';

// const axios = require('axios').default;

function ListClients(props) {
  const [clients, setClients] = useState([]);
  const token = localStorage.getItem('token');
  const loadData = async () => {
    try {
      const response = await axios.get('https://majordome-api.herokuapp.com/api/clients', {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log('#clients#');
      console.log(response);
      setClients(response.data);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // create a new array by filtering the original array
  const filteredClients = clients.filter((el) => {
    // if no input the return the original
    if (props.input === '') {
      return el;
    }
    // return the item which contains the user input
    // modifier pour avoir une multi recherche sur first et lastName
    return (el.firstname.toLowerCase().includes(props.input))
    || (el.lastname.toLowerCase().includes(props.input));
  });

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mr: 1,
        ml: 1,
      }}
    >
      <List>
        {filteredClients.map((client) => (
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              mb: 1,
              width: '100%',
              height: '100%',
            },
          }}
          >
            {/* <Paper elevation={3}> */}
            <ListItem
              sx={{
                borderRadius: '10px',
                border: 2,
                boxShadow: 3,
                borderColor: 'primary.light',
              }}
            >
              <Link to={`/clients/${client.id}`} key={client.id}>
                <ListItemText
                  primary={`${client.firstname} ${client.lastname}`}
                />
              </Link>
            </ListItem>
            {/* </Paper> */}
          </Box>
        ))}
      </List>
    </Box>
  );
}

export default ListClients;
