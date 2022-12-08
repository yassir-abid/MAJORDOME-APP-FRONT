/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import axios from 'axios';

import TextField from '@mui/material/TextField';

import { logout } from '../../actions/signUp';
import logo from '../../assets/butler.png';
import './newPassword.scss';
import baseUrl from '../../utils';

function NewPassword() {
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { id } = useSelector((state) => state.password);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changePassword = async (event) => {
    try {
      event.preventDefault();
      await axios.patch(`${baseUrl}/changepassword`, {
        id,
        password,
        passwordConfirm,
      });
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      if (error.response.data.message === 'Password and its confirmation do not match') {
        setMessage(error.response.data.message);
      } else {
        setMessage('Something broken ! Please try again');
      }
    }
  };

  return (
    <div className="newPassword">
      <div className="newPassword__container">
        <img className="login__logo" src={logo} alt="logo" />
        <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 0 }}>Modification du mot de passe</Typography>
        <form className="newPassword-form-element" onSubmit={changePassword}>
          <div>
            <TextField
              className="newPassword__input"
              required
              sx={{ mt: 3, mb: 3 }}
              fullWidth
              label="Nouveau mot de passe"
              name="password"
              type="password"
              placeholder="Nouveau mot de passe"
              onChange={(event) => setPassword(event.target.value)}
            />
            <TextField
              className="newPassword__input"
              required
              sx={{ mb: 4 }}
              fullWidth
              label="Confirmation mot de passe"
              name="password"
              type="password"
              placeholder="Confirmation mot de passe"
              onChange={(event) => setPasswordConfirm(event.target.value)}
            />
          </div>
          <button className="newPassword-form-button" fullWidth type="submit" Value="Envoyer">
            Envoyer
          </button>
        </form>
        <Typography variant="h9" component="div" gutterBottom sx={{ mb: 0 }}>
          {message}
        </Typography>
      </div>
    </div>
  );
}

export default NewPassword;
