/* eslint-disable react/jsx-fragments */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import Loading from './Loading';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
// import { ThemeProvider, ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
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
import DocumentByclient from '../DocumentByClient/DocumentByClient';
import DocumentByProjects from '../DocumentByProjects/DocumentByProjects';
import DocumentByInterventions from '../DocumentByInterventions/DocumentByInterventions';

// import 'devextreme/dist/css/dx.greenmist.compact.css';
// import './style.scss';

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
  const token = localStorage.getItem('token');

  const ThemeOptions = createTheme({
    // palette: {
    //   primary: {
    //     light: '#33a3a3',
    //     main: '#008c8c',
    //     dark: '#006262',
    //     contrastText: '#fff',
    //   },
    //   secondary: {
    //     light: '#834bff',
    //     main: '#651fff',
    //     dark: '#4615b2',
    //     contrastText: '#000',
    //   },
    // },
    palette: {
      type: 'light',
      primary: {
        main: '#008c8c',
      },
      secondary: {
        main: '#673ab7',
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
          maxWidth="md"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            height: '100vh',
          }}
        >
          <Box sx={{ bgcolor: 'background.default' }}>
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
              <Route path="/documents/clients/:id" element={<DocumentByclient />} />
              <Route path="/documents/projects/:id" element={<DocumentByProjects />} />
              <Route path="/documents/interventions/:id" element={<DocumentByInterventions />} />
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
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
