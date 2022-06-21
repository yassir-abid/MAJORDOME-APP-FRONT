/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import { React, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { changeValue } from '../../actions/password';
import logo from '../../assets/butler.png';
import './resetPassword.scss';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [sentRequest, setSentRequest] = useState(false);
  const [message, setMessage] = useState('');

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const id = searchParams.get('id');

  const checkEmail = async (event) => {
    setSentRequest(true);
    try {
      event.preventDefault();
      await axios.post('https://majordome-api.herokuapp.com/api/resetpassword', {
        email,
      });
      setMessage('Un email pour réinitialiser votre mot de passe vous a été envoyé !');
    } catch (error) {
      if (error.response.data.message) {
        setMessage(error.response.data.message);
      }
    }
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const VerifyToken = async () => {
    setSentRequest(true);
    try {
      await axios.get(`https://majordome-api.herokuapp.com/api/resetpassword?token=${token}&id=${id}`);
      dispatch(changeValue(id, 'id'));
      navigate('/newpassword');
    } catch (error) {
      if (error.response.data.message) {
        setMessage(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (token && id) {
      VerifyToken();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="resetPassword">
      <div className="resetPassword__container">
        <img className="login__logo" src={logo} alt="logo" />
        <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 0 }}>Réinitialisation du mot de passe</Typography>
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
          </div>
          <button className="resetPassword-form-button" type="submit" Value="Envoyer">
            Envoyer
          </button>
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
