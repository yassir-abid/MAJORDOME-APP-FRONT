/* eslint-disable react/prop-types */
// FIXME: valider les props en enlever la règle ci-dessous
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

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
        flexDirection: 'column',
        mr: 1,
        ml: 1,
      }}
    >
      <List>
        {filteredClients.map((client) => (
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
            <Link to={`/clients/${client.id}`} key={client.id}>
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
                  primary={`${client.firstname} ${client.lastname}`}
                />

              </ListItem>
            </Link>
            {/* </Paper> */}
          </Box>
        ))}
      </List>
    </Box>
  );
}

export default ListClients;
