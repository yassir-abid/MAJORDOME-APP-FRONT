/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../LoginForm';
import './style.scss';
import { changeUserLoginField, login, logout } from '../../actions/user';
import logo from '../../assets/butler.png';

function Login() {
  // dispatch actions
  const dispatch = useDispatch();
  // redirect after login
  const navigate = useNavigate();

  // access to my state
  const {
    email, password, logged, pseudo,
  } = useSelector((state) => state.user);

  const handleChangeField = (value, name) => {
    dispatch(changeUserLoginField(value, name));
  };

  const handleLogin = () => {
    dispatch(login());
    navigate('/home-app');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

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
        />
      </div>
    </div>
  );
}

export default Login;
