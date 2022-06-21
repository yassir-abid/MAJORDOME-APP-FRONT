/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { React } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';

function ListProjects(props) {
  const { projects } = props;
  const filteredProjects = projects.filter((el) => {
    if (props.input === '') {
      return el;
    }
    return el.title.toLowerCase().includes(props.input)
    || el.status.toLowerCase().includes(props.input);
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
        {filteredProjects.map((project) => (
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
            <Link to={`/projects/${project.id}`} key={project.id}>
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
                  primary={`${project.title}`}
                />
                <Chip size="small" sx={{ minWidth: 70 }} label={project.status} color="primary" />
              </ListItem>
            </Link>
          </Box>
        ))}
      </List>
    </Box>
  );
}

export default ListProjects;
