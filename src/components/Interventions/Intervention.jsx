/* eslint-disable import/no-extraneous-dependencies */
import { React, useState } from 'react';
import { Icon } from '@iconify/react';
import TextField from '@mui/material/TextField';
import InterventionsHeader from './InterventionsHeader';
import './interventions.scss';
import List from './List';

function Interventions() {
  const [inputText, setInputText] = useState('');
  const inputHandler = (e) => {
    // convert input text to lower case
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <div className="interventions">
      <InterventionsHeader />
      <div className="interventions-main">
        <div>
          <TextField
            className="interventions-searchBar"
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            label="Search"
          />
        </div>
        <List input={inputText} />
        <div className="interventions-addintervention">
          <Icon icon="carbon:add-filled" width="30" height="30" />
        </div>
      </div>

    </div>
  );
}

export default Interventions;
