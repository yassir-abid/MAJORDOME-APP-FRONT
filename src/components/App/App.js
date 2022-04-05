import React from 'react';
// import Home from '../Home/Home';
import HomeApp from '../HomeApp/HomeApp';
import NavBar from '../NavBar/NavBar';
import SignUp from '../SignUp';
// import Login from '../Login';
import './style.scss';

function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      <HomeApp />
      <NavBar />
      <SignUp />
    </div>
  );
}

export default App;
