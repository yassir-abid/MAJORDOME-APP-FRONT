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
  const [sentRequest, setSentRequest] = useState(false);
  const [message, setMessage] = useState('');

  const checkEmail = async (event) => {
    setSentRequest(true);
    try {
      event.preventDefault();
      const response = await axios.post('https://majordome-api.herokuapp.com/api/resetpassword', {
        email,
      });
      setInfos(response.data);
      setMessage('Un email pour réinitialiser votre mot de passe vous a été envoyé !');
    } catch (error) {
      if (error.response.data.message) {
        setMessage(error.response.data.message);
      }
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
        {
            sentRequest
              ? (
                <Typography variant="h9" component="div" gutterBottom sx={{ mb: 0 }}>
                  {message}
                </Typography>
              )
              : null
        }
      </div>
    </div>
  );
}

export default ResetPassword;
