/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SignUpForm from '../SignUpForm';
import './style.scss';
import { changeUserSignupField, signUp, logout } from '../../actions/signUp';
import logo from '../../assets/butler.png';

function Signup() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    lastname, firstname, email, password, passwordConfirm, logged, pseudo, signUperrorMessage,
  } = useSelector((state) => state.signUp);

  const handleChangeField = (value, name) => {
    dispatch(changeUserSignupField(value, name));
  };

  const handleSignup = () => {
    dispatch(signUp());
    navigate('/login');
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="signup">
      <div className="signup__container">
        <img className="signup_logo" src={logo} alt="logo" />
        <SignUpForm
          lastname={lastname}
          firstname={firstname}
          email={email}
          password={password}
          passwordConfirm={passwordConfirm}
          isLogged={logged}
          changeField={handleChangeField}
          handleSignup={handleSignup}
          handleLogout={handleLogout}
          signUperrorMessage={signUperrorMessage}
        />
      </div>
    </div>
  );
}

export default Signup;
