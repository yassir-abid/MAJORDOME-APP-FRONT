/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { React, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

// import data from './ListData.json';

function ListDocuments(props) {
  const { docs } = props;

  // create a new array by filtering the original array
  const filteredDocs = docs.filter((el) => {
    // if no input the return the original
    if (props.input === '') {
      return el;
    }
    // return the item which contains the user input

    return el.title.toLowerCase().includes(props.input);
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
        {filteredDocs.map((item) => (
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
            <Link to={`/documents/${item.id}`} key={item.id}>
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
                  primary={item.title}
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

export default ListDocuments;
