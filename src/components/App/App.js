import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from '../Home/Home';
import HomeApp from '../HomeApp/HomeApp';
import NavBar from '../NavBar/NavBar';
import { checkUser } from '../../actions/user';
import SignUp from '../SignUp';
import Login from '../Login';
import Profile from '../Profile/Profile';
import './style.scss';
import Clients from '../Clients/clients';
import Interventions from '../Interventions/Intervention';
import InterventionsDetail from '../InterventionsDetail/InterventionsDetail';
import InterventionsReport from '../InterventionsReport/InterventionsReport';
import Projects from '../Projects/Projects';
import Schedule from '../Schedule/Schedule';
import Suppliers from '../Suppliers/Suppliers';
import Documents from '../Documents/Documents';
import Todo from '../Todo/Todo';
import Notifications from '../Notifications/Notifications';
import Error from '../Error/Error';
import DocumentsDetail from '../DocumentsDetail/DocumentsDetail';

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home-app" element={<HomeApp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/documentsDetail" element={<DocumentsDetail />} />
        <Route path="/interventions" element={<Interventions />} />
        <Route path="/interventionsDetail" element={<InterventionsDetail />} />
        <Route path="/interventionsReport" element={<InterventionsReport />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/todolist" element={<Todo />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <NavBar />
    </div>
  );
}

export default App;
