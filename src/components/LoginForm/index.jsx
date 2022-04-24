/* eslint-disable react/react-in-jsx-scope */

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Field from './Field';

// import './style.scss';

function LoginForm({
  email,
  password,
  changeField,
  handleLogin,
  handleLogout,
  isLogged,
  loggedMessage,
  errorMessage,
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
            className="login-form-button"
            onClick={handleLogout}
          >
            Déconnexion
          </button>
          <Link to="/home-app">
            <button
              type="button"
              className="login-form-button login-form-button--accueil"
            >
              Mon Accueil
            </button>
          </Link>
        </div>
      )}
      {!isLogged && (
        <div>
          <form autoComplete="off" className="login-form-element" onSubmit={handleSubmit}>
            <Field
              name="email"
              type="email"
              placeholder="Adresse Email"
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
            {/* error message if login or password invalid */}
            {errorMessage.length > 0 && (<p>{errorMessage}</p>)}
            <button
              type="submit"
              className="login-form-button"
            >
              Me connecter
            </button>
          </form>
          <a className="login-form-signup" href="resetpassword">Mot de passe oublié ?</a>
          <div className="login-form-signup">
            <Link to="/signup">
              <button
                type="submit"
                className="login-form-button"
              >
                Inscription
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  isLogged: PropTypes.bool,
  loggedMessage: PropTypes.string,
  errorMessage: PropTypes.string.isRequired,
};

LoginForm.defaultProps = {
  isLogged: false,
  loggedMessage: 'Connecté',
};

export default LoginForm;
