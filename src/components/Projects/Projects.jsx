/* eslint-disable import/no-extraneous-dependencies */
import { React, useState } from 'react';
import TextField from '@mui/material/TextField';
import ProjectsHeader from './ProjectsHeader';
import List from './List';
import './style.scss';

function Projects() {
  const [inputText, setInputText] = useState('');
  const inputHandler = (e) => {
    // convert input text to lower case
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <div className="projects">
      <ProjectsHeader />
      <div className="projects__container__list">
        <TextField
          className="projects-searchBar"
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        />
        <List input={inputText} />
      </div>
    </div>
  );
}

export default Projects;
