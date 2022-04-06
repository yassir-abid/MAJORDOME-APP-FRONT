import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import logo from '../../assets/butler.png';

function SignUp() {
  return (
    <div className="signup">
      <div className="signup__container">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <form className="signup__form">
          <input className="signup__input" type="text" required placeholder="Nom" />
          <input className="signup__input" type="text" required placeholder="Prénom" />
          <input className="signup__input" type="email" required placeholder="Email" />
          <input className="signup__input" type="password" required placeholder="Password" />
          <button className="signup__submit" type="submit">Inscription</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
