/* eslint-disable react/react-in-jsx-scope */

import PropTypes from 'prop-types';

import Field from './Field';

import './style.scss';

function SignUpForm({
  lastName,
  firstName,
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
              name="lastName"
              placeholder="Nom"
              onChange={changeField}
              value={lastName}
            />
            <Field
              name="firstName"
              placeholder="Prénom"
              onChange={changeField}
              value={firstName}
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
            <button
              type="submit"
              className="login-form-button"
            >
              Me connecter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

SignUpForm.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
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
