/* eslint-disable react/react-in-jsx-scope */

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Field from './Field';

function LoginForm({
  email,
  password,
  changeField,
  handleLogin,
  errorMessage,
}) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-form">
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

          {errorMessage.length > 0 && (<p>{errorMessage}</p>)}
          <button
            type="submit"
            className="login-form-button"
          >
            Connexion
          </button>
        </form>
        <Link to="/resetpassword" className="login-form-signup">Mot de passe oublié</Link>
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
  );
}

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default LoginForm;
