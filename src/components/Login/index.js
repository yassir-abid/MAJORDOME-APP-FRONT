/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserLoginField } from '../../actions/user';
import logo from '../../assets/butler.png';

function Login() {
  // To dispatch actions
  const dispatch = useDispatch();

  // To access to my state
  const {
    email, password, logged,
  } = useSelector((state) => state.user);

  // Controlled field
  const inputChange = (event, value, name) => {
    dispatch(changeUserLoginField(value, name));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('je click sur le submit');
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src={logo} alt="logo" />
        {!logged && (
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            className="login__input"
            name="email"
            type="email"
            required
            placeholder="Email"
            onChange={inputChange}
            value={email}
          />
          <input
            className="login__input"
            name="password"
            type="password"
            required
            placeholder="Password"
            onChange={inputChange}
            value={password}
          />
          <button className="login__submit" type="submit">Se connecter</button>
        </form>
        )}
      </div>
    </div>
  );
}

export default Login;
