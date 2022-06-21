/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
import { React } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function ListClients(props) {
  const { clients } = props;

  const filteredClients = clients.filter((el) => {
    if (props.input === '') {
      return el;
    }

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
                  primary={`${client.lastname} ${client.firstname}`}
                />
              </ListItem>
            </Link>
          </Box>
        ))}
      </List>
    </Box>
  );
}

export default ListClients;
