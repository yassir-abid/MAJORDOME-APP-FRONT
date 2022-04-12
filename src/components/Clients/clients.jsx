/* eslint-disable import/no-extraneous-dependencies */
import { React, useState } from 'react';
import { Icon } from '@iconify/react';
import TextField from '@mui/material/TextField';
import ClientsHeader from './ClientsHeader';
import List from './List';
import './clients.scss';

function Clients() {
  const [inputText, setInputText] = useState('');
  const inputHandler = (e) => {
    // convert input text to lower case
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <div className="clients">
      <ClientsHeader />
      <div className="clients-main">
        <div>
          <TextField
            className="clients-searchBar"
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            label="Search"
          />
        </div>
        <List input={inputText} />
        <div className="clients-addClient">
          <Icon icon="carbon:add-filled" width="30" height="30" />
        </div>
      </div>

    </div>
  );
}

export default Clients;
