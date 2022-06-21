/* eslint-disable react/react-in-jsx-scope */

import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

import Field from './Field';

import './style.scss';

function SignUpForm({
  firstname,
  lastname,
  email,
  password,
  passwordConfirm,
  changeField,
  handleSignup,
  isLogged,
  signUperrorMessage,
}) {
  const navigate = useNavigate();

  const handleSignUpSubmit = (evt) => {
    evt.preventDefault();
    handleSignup();
  };

  return (
    <div className="login-form">
      {isLogged && (
        navigate('/home-app')
      )}
      {!isLogged && (
        <div>
          <form autoComplete="off" className="login-form-element" onSubmit={handleSignUpSubmit}>
            <Field
              name="lastname"
              placeholder="Nom"
              onChange={changeField}
              value={lastname}
            />
            <Field
              name="firstname"
              placeholder="Prénom"
              onChange={changeField}
              value={firstname}
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
            <Field
              name="passwordConfirm"
              type="password"
              placeholder="Confirmation mot de passe"
              onChange={changeField}
              value={passwordConfirm}
            />
            {signUperrorMessage.length > 0 && (<p>{signUperrorMessage}</p>)}
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
  passwordConfirm: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handleSignup: PropTypes.func.isRequired,
  isLogged: PropTypes.bool,
  signUperrorMessage: PropTypes.string.isRequired,
};

SignUpForm.defaultProps = {
  isLogged: false,
};

export default SignUpForm;
