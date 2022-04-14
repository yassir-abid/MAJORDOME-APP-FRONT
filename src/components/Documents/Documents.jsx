import React from 'react';
import CardMedia from '@mui/material/CardMedia';
import butler from '../../assets/avant.jpeg';
import './style.scss';

function Documents() {
  return (
    <div>
      <p>Vous êtes dans la page Documents</p>
      <div>
        <CardMedia
          component="img"
          height="140"
          src={butler}
          alt="test import img"
        />
      </div>
    </div>

  );
}

export default Documents;
