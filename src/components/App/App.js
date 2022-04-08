import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkUser } from '../../actions/user';
// import Home from '../Home/Home';
// import HomeApp from '../HomeApp/HomeApp';
// import NavBar from '../NavBar/NavBar';
// import SignUp from '../SignUp';
import Login from '../Login';
import './style.scss';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // recup token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(checkUser());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      {/* <Home /> */}
      {/* <HomeApp />
      <NavBar /> */}
      <Login />
      {/* <SignUp /> */}
    </div>
  );
}

export default App;
