/* eslint-disable react/react-in-jsx-scope */

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Field from './Field';

import './style.scss';

function SignUpForm({
  firstname,
  lastname,
  email,
  password,
  changeField,
  handleLogin,
  isLogged,
  loggedMessage,
}) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-form">
      {isLogged && (
        <div className="login-form-logged">
          <p className="login-form-message">
            {loggedMessage}
          </p>
          <button
            type="button"
            className="login-form-button login-form-button--accueil"
          >
            Mon Accueil
          </button>
        </div>
      )}
      {!isLogged && (
        <div>
          <form autoComplete="off" className="login-form-element" onSubmit={handleSubmit}>
            <Field
              name="firstname"
              placeholder="Prénom"
              onChange={changeField}
              value={firstname}
            />
            <Field
              name="lastname"
              placeholder="Nom"
              onChange={changeField}
              value={lastname}
            />
            <Field
              name="email"
              placeholder="Adresse Email"
              type="email"
              onChange={changeField}
              value={email}
            />
            <Field
              name="password"
              type="password"
              placeholder="Mot de passe"
              onChange={changeField}
              value={password}
            />
            <button
              type="submit"
              className="login-form-button"
            >
              Inscription
            </button>
          </form>
          <div className="login-form-signup">
            <span>Vous avez déjà un compte ? </span>
            <Link to="/login">
              <button
                type="submit"
                className="login-form-button"
              >
                Me connecter
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

SignUpForm.propTypes = {
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  isLogged: PropTypes.bool,
  loggedMessage: PropTypes.string,
};

SignUpForm.defaultProps = {
  isLogged: false,
  loggedMessage: 'Connecté',
};

export default SignUpForm;
