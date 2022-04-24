import React from 'react';
import './style.scss';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Serveur from '../../assets/serveur4.jpg';

function Error() {
  return (
    <div className="error">
      <Card>
        <CardMedia
          component="img"
          height="550"
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
    </div>
  );
}

export default Error;
