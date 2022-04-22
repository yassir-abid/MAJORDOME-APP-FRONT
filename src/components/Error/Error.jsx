import React from 'react';
import './style.scss';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Serveur from '../../assets/serveur.jpg';

function Error() {
  return (
    <Card>
      <CardMedia
        component="img"
        height="500"
        src={Serveur}
        alt="page 404"
      />
      <CardContent>
        <Typography>
          Il semblerait que la page demandée ne soit pas présente ou accessible quel dommage...
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Error;
