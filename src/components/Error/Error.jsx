import React from 'react';
import './style.scss';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

function Error() {
  return (

    <Card sx={{ maxWidth: 600 }}>
      <CardMedia
        component="img"
        image="/assets/serveur.jpg"
        alt="image 404"
      />
    </Card>
  );
}

export default Error;
