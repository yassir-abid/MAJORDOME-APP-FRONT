/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import Loading from './Loading';
import Home from '../Home/Home';
import HomeApp from '../HomeApp/HomeApp';
import NavBar from '../NavBar/NavBar';
import { checkUser } from '../../actions/user';
import SignUp from '../SignUp';
import Login from '../Login';
import Profile from '../Profile/Profile';
import Clients from '../Clients/clients';
import Client from '../Client/Client';
import Equipments from '../Client/Equipments/Equipments';
import Interventions from '../Interventions/Intervention';
import InterventionsDetail from '../InterventionsDetail/InterventionsDetail';
import InterventionsReport from '../InterventionsReport/InterventionsReport';
import Projects from '../Projects/Projects';
import ProjectDetails from '../Projects/ProjectDetails/ProjectDetails';
import Schedule from '../Schedule/Schedule';
// import Schedule from '../ScheduleTest/ScheduleTest';
import Suppliers from '../Suppliers/Suppliers';
import SuppliersDetail from '../SuppliersDetail/SuppliersDetail';
import Documents from '../Documents/Documents';
import Todo from '../Todo/Todo';
import Notifications from '../Notifications/Notifications';
import Error from '../Error/Error';
import DocumentsDetail from '../DocumentsDetail/DocumentsDetail';

// import 'devextreme/dist/css/dx.greenmist.compact.css';
import './style.scss';

function App() {
  const dispatch = useDispatch();
  // const loading = useSelector((state) => state.user.loading);
  useEffect(() => {
    // recup token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(checkUser());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   if (loading) {
  //     return <Loading />;
  //   }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home-app" element={<HomeApp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/clients/:id" element={<Client />} />
        <Route path="/clients/:id/equipments" element={<Equipments />} />
        {/* <Route path="/clients/:id/notifications_list" element={<Notifications_list />} /> */}
        {/* <Route path="/clients/:id/documents_list" element={<Documents_list />} /> */}
        <Route path="/documents" element={<Documents />} />
        <Route path="/documents/:id" element={<DocumentsDetail />} />
        <Route path="/interventions" element={<Interventions />} />
        <Route path="/interventions/:id" element={<InterventionsDetail />} />
        <Route path="/interventions/:id/report" element={<InterventionsReport />} />
        {/* <Route path="/interventions/:id/documents_list" element={<Documents_list />} /> */}
        {/* <Route path="/interventions/:id/notifications_list" element={<Notifications_list />} /> */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/suppliers/:id" element={<SuppliersDetail />} />
        <Route path="/todolist" element={<Todo />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <NavBar />
    </div>
  );
}

export default App;
