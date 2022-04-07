/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignUpForm from '../SignUpForm';
import './style.scss';
import { changeUserLoginField, signUp, logout } from '../../actions/signUp';
import logo from '../../assets/butler.png';

function Signup() {
  // dispatch actions
  const dispatch = useDispatch();

  // access to my state
  const {
    lastName, firstName, email, password, logged, pseudo,
  } = useSelector((state) => state.signUp);

  const handleChangeField = (value, name) => {
    dispatch(changeUserLoginField(value, name));
  };

  const handleLogin = () => {
    dispatch(signUp());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="signup">
      <div className="signup__container">
        <img className="signup_logo" src={logo} alt="logo" />
        <SignUpForm
          lastName={lastName}
          firstName={firstName}
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

export default Signup;
