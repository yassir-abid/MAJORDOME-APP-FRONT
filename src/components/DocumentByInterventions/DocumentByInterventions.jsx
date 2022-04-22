/* eslint-disable import/no-extraneous-dependencies */
import { React, useState } from 'react';
import { Icon } from '@iconify/react';
import TextField from '@mui/material/TextField';
import DocumentsHeader from './DocumentsHeader';
import './documentByInterventions.scss';
import List from './List';

function Documents() {
  const [inputText, setInputText] = useState('');
  const inputHandler = (e) => {
    // convert input text to lower case
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <div className="documents">
      <DocumentsHeader />
      <div className="documents-main">
        <div>
          <TextField
            className="documents-searchBar"
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            label="Search"
          />
        </div>
        <List input={inputText} />
        <div className="documents-addDocument">
          <Icon icon="carbon:add-filled" width="30" height="30" />
        </div>
      </div>

    </div>
  );
}

export default Documents;
