import React from 'react';
// import Home from '../Home/Home';
import HomeApp from '../HomeApp/HomeApp';
import NavBar from '../NavBar/NavBar';
import './style.scss';

function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      <HomeApp />
      <NavBar />
    </div>
  );
}

export default App;
