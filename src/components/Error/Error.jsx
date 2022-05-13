import React from 'react';
import './style.scss';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Serveur from '../../assets/serveur.jpeg';

function Error() {
  return (
    <Box sx={{ }}>
      <Card sx={{ width: '100%' }}>
        <CardMedia
          component="img"
          // height="80%"
          src={Serveur}
          alt="page 404"
        />
        <CardContent>
          <Typography>
            Il semblerait que la page demandée ne soit pas présente ou accessible quel dommage...
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined" size="small" color="primary" href="/login">
            Home
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default Error;
