/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import './newPassword.scss';

function NewPassword() {
  const [infos, setInfos] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const id = useSelector((state) => state.password);

  console.log('id new password', id);

  const navigate = useNavigate();

  const changePassword = async (event) => {
    try {
      event.preventDefault();
      await axios.patch('https://majordome-api.herokuapp.com/api/resetpassword', {
        id,
        password,
        passwordConfirm,
      });
    } catch (error) {
      if (error.response.data.message) {
        // setMessage(error.response.data.message);
      }
    }
  };

  //   useEffect(() => {
  //     if (token && id) {
  //       VerifyToken();
  //     }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  return (
    <div className="newPassword">
      <div className="newPassword__container">
        <img className="login__logo" src={logo} alt="logo" />
        <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 0 }}>Réinitialisation du mot de passe</Typography>
        <form className="newPassword-form-element" onSubmit={changePassword}>
          <div>
            <TextField
              className="newPassword__input"
              required
              sx={{ m: 1 }}
              fullWidth
              label="password"
              name="password"
              type="password"
              placeholder="Votre nouveau mot de passe"
            //   onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <TextField className="newPassword-form-button" sx={{ m: 1, bgcolor: 'text.disabled' }} fullWidth type="submit" defaultValue="Envoyer" />
        </form>
        {/* {
            sentRequest
              ? (
                <Typography variant="h9" component="div" gutterBottom sx={{ mb: 0 }}>
                  {message}
                </Typography>
              )
              : null
        } */}
      </div>
    </div>
  );
}

export default NewPassword;
