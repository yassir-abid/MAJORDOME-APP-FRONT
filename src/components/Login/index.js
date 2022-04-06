/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import logo from '../../assets/butler.png';

function Login() {
  return (
    <div className="login">
      <div className="login__container">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <form className="login__form">
          <input className="login__input" type="email" required placeholder="Email" />
          <input className="login__input" type="password" required placeholder="Password" />
          <button className="login__submit" type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
