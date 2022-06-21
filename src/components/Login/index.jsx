/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';

import LoginForm from '../LoginForm';
import './style.scss';
import { changeUserLoginField, login, logout } from '../../actions/user';
import logo from '../../assets/butler.png';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    email, password, logged, pseudo, errorMessage,
  } = useSelector((state) => state.user);

  const handleChangeField = (value, name) => {
    dispatch(changeUserLoginField(value, name));
  };

  const handleLogin = () => {
    dispatch(login());
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  if (logged) {
    return <Navigate to="/home-app" replace />;
  }

  return (
    <div className="login">
      <div className="login__container">
        <img className="login__logo" src={logo} alt="logo" />
        <LoginForm
          email={email}
          password={password}
          isLogged={logged}
          changeField={handleChangeField}
          handleLogin={handleLogin}
          loggedMessage={`Bonjour ${pseudo}`}
          handleLogout={handleLogout}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}

export default Login;
