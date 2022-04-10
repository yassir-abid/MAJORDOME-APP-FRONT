/* eslint-disable import/no-extraneous-dependencies */
import { React, useState } from 'react';
import { Icon } from '@iconify/react';
import TextField from '@mui/material/TextField';
import SuppliersHeader from './SuppliersHeader';
import './suppliers.scss';
import List from './List';

function Suppliers() {
  const [inputText, setInputText] = useState('');
  const inputHandler = (e) => {
    // convert input text to lower case
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <div className="suppliers">
      <SuppliersHeader />
      <div className="suppliers-main">
        <div>
          <TextField
            className="suppliers-searchBar"
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            label="Search"
          />
        </div>
        <List input={inputText} />
        <div className="suppliers-addSupplier">
          <Icon icon="carbon:add-filled" width="30" height="30" />
        </div>
      </div>

    </div>
  );
}

export default Suppliers;
