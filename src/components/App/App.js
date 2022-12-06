/* eslint-disable react/jsx-fragments */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Home from '../Home/Home';
import HomeApp from '../HomeApp/HomeApp';
import NavBar from '../NavBar/NavBarMui';
import { checkUser } from '../../actions/user';
import SignUp from '../SignUp';
import Login from '../Login';
import Profile from '../Profile/Profile';
import Clients from '../Clients/clients';
import Client from '../Client/Client';
import Equipments from '../Client/Equipments/Equipments';
import Interventions from '../Interventions/Intervention';
import InterventionsDetails from '../InterventionsDetail/InterventionsDetail';
import InterventionsReport from '../InterventionsReport/InterventionsReport';
import Projects from '../Projects/Projects';
import ProjectDetails from '../Projects/ProjectDetails/ProjectDetails';
import Schedule from '../Schedule/Schedule';
import Documents from '../Documents/Documents';
import Error from '../Error/Error';
import DocumentsDetails from '../DocumentsDetail/DocumentsDetail';
import DocumentByclient from '../DocumentByClient/DocumentByClient';
import DocumentByProject from '../DocumentByProjects/DocumentByProjects';
import DocumentByIntervention from '../DocumentByInterventions/DocumentByInterventions';
import ResetPassword from '../ResetPassword/resetPassword';
import NewPassword from '../NewPassword/newPassword';

import baseUrl from '../../utils';

// eslint-disable-next-line react/prop-types
function RequireAuth({ children }) {
  const token = localStorage.getItem('token');

  const logged = async () => {
    const response = await axios.get(`${baseUrl}/login/checkuser`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data.logged;
  };

  if (!token || !logged) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(checkUser());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { logged } = useSelector((state) => state.user);

  const ThemeOptions = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#008c8c',
      },
      secondary: {
        main: '#651fff',
      },
      background: {
        default: '#eeeeee',
      },
    },
    overrides: {
      MuiSwitch: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
          margin: 8,
        },
        switchBase: {
          padding: 1,
          '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + $track': {
              opacity: 1,
              border: 'none',
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 13,
          border: '1px solid #bdbdbd',
          backgroundColor: '#fafafa',
          opacity: 1,
          transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        },
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={ThemeOptions}>
        <Container
          disableGutters="false"
          maxWidth="auto"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            height: '92vh',
            bgcolor: 'background.default',
            p: 0,
          }}
        >
          <Box>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resetpassword" element={<ResetPassword />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/newpassword"
                element={(
                  <RequireAuth>
                    <NewPassword />
                  </RequireAuth>
                  )}
              />
              <Route
                path="/home-app"
                element={(
                  <RequireAuth>
                    <HomeApp />
                  </RequireAuth>
                )}
              />
              <Route
                path="/profile"
                element={(
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                )}
              />
              <Route
                path="/clients"
                element={(
                  <RequireAuth>
                    <Clients />
                  </RequireAuth>
                )}
              />
              <Route
                path="/clients/:id"
                element={(
                  <RequireAuth>
                    <Client />
                  </RequireAuth>
                )}
              />
              <Route
                path="/clients/:id/equipments"
                element={(
                  <RequireAuth>
                    <Equipments />
                  </RequireAuth>
                )}
              />
              <Route
                path="/documents"
                element={(
                  <RequireAuth>
                    <Documents />
                  </RequireAuth>
                )}
              />
              <Route
                path="/documents/:id"
                element={(
                  <RequireAuth>
                    <DocumentsDetails />
                  </RequireAuth>
                  )}
              />
              <Route
                path="/documents/clients/:id"
                element={(
                  <RequireAuth>
                    <DocumentByclient />
                  </RequireAuth>
                  )}
              />
              <Route
                path="/documents/projects/:id"
                element={(
                  <RequireAuth>
                    <DocumentByProject />
                  </RequireAuth>
                  )}
              />
              <Route
                path="/documents/interventions/:id"
                element={(
                  <RequireAuth>
                    <DocumentByIntervention />
                  </RequireAuth>
                  )}
              />
              <Route
                path="/interventions"
                element={(
                  <RequireAuth>
                    <Interventions />
                  </RequireAuth>
                  )}
              />
              <Route
                path="/interventions/:id"
                element={(
                  <RequireAuth>
                    <InterventionsDetails />
                  </RequireAuth>
                  )}
              />
              <Route
                path="/interventions/:id/report"
                element={(
                  <RequireAuth>
                    <InterventionsReport />
                  </RequireAuth>
                  )}
              />
              <Route
                path="/projects"
                element={(
                  <RequireAuth>
                    <Projects />
                  </RequireAuth>
                  )}
              />
              <Route
                path="/projects/:id"
                element={(
                  <RequireAuth>
                    <ProjectDetails />
                  </RequireAuth>
                  )}
              />
              <Route
                path="/schedule"
                element={(
                  <RequireAuth>
                    <Schedule />
                  </RequireAuth>
                  )}
              />
              <Route path="*" element={<Error />} />
            </Routes>
            {logged && <NavBar />}
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
