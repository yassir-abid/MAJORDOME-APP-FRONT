/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import { React, useState, useEffect } from 'react';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import { Icon } from '@iconify/react';
import Box from '@mui/material/Box';
import Avatar from '../Avatar/Avatar';

import logo from '../../assets/butler.png';
import './resetPassword.scss';

function ResetPassword() {
  const [infos, setInfos] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [id, setId] = useState('');
  const [message, setMessage] = useState(false);

  const checkEmail = async (event) => {
    try {
      event.preventDefault();
      console.log(email);
      const response = await axios.post('https://majordome-api.herokuapp.com/api/resetpassword', {
        email,
      });

      console.log(response.data);
      setInfos(response.data);
      setMessage(true);
    } catch (error) {
      console.log('Erreur de chargement', error);
    //   store.dispatch(userErrorMessage(error.response.data.message || 'connexion impossible'));
    }
  };

  const VerifyToken = async () => {
    try {
      const [searchParams] = useSearchParams();
      const response = await axios.post(`https://majordome-api.herokuapp.com/api/resetpassword?token=${token}&id=${id}`, {
        token,
        id,
      });
      console.log(searchParams.entries());

      setInfos(response.data);
      setMessage(true);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  return (
    <div className="resetPassword">
      <div className="resetPassword__container">
        <img className="login__logo" src={logo} alt="logo" />
        <h1>Réinitialisation du mot de passe</h1>
        <form className="resetPassword-form-element" onSubmit={checkEmail}>
          <div>
            <TextField
              className="resetPassword__input"
              required
              sx={{ m: 1 }}
              fullWidth
              label="email"
              name="email"
              type="email"
              placeholder="Adresse Email"
              onChange={(event) => setEmail(event.target.value)}
            />
            {/* error message if email invalid */}
            {/* {message ? 'Votre demande de réinitialisation de mot de passe a bien été prise en compte. Un email de réinitialisation de mot de passe vous a été envoyé !' :}
              {errorMessage.length > 0 && (<p>{errorMessage}</p>)} */}
          </div>
          <TextField className="resetPassword-form-button" sx={{ m: 1, bgcolor: 'text.disabled' }} fullWidth type="submit" defaultValue="Envoyer" />
        </form>
        {/* {
            // eslint-disable-next-line no-nested-ternary
            infos.success
              ? (
                <Typography variant="h6" component="div" gutterBottom sx={{ mb: 0 }}>
                  Votre demande de réinitialisation de mot de passe a bien été prise en compte. Un email de réinitialisation de mot de passe vous a été envoyé !
                </Typography>
              )
              : !infos.success && message
                ? (
                  <Typography variant="h6" component="div" gutterBottom sx={{ mb: 0 }}>
                    Email invalide !
                  </Typography>
                )
                : (
                  <Typography variant="h6" component="div" gutterBottom sx={{ mb: 0 }}>
                    Une erreur est survenue ! Veuillez réessayer plus tard !
                  </Typography>
                )
        } */}
      </div>
    </div>
  );
}

export default ResetPassword;
