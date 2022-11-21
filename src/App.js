import React, { useEffect, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { fetchCategoriesData, fetchTasksData } from './store/tasks';
import { fetchGroupsData } from './store/users';

import Sidebar from './components/Sidebar/Sidebar';
import NewTask from './pages/NewTask';
import GroupTasks from './pages/GroupTasks';
import Search from './pages/Search';
import TaskDetail from './pages/TaskDetail';
import UserTasks from './pages/UserTasks';
import UserCreatedTasks from './pages/UserCreatedTasks';
import ManageTasksData from './pages/ManageTasksData';
import ManageUsersData from './pages/ManageUsersData';
import Account from './pages/Account';
import NotFound from './pages/NotFound';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';

import './App.css';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

let isInitial = true;

function App() {

  const dispatch = useDispatch();

  const isDarkModeEnabled = useSelector(state => state.ui.isDarkModeEnabled);

  const theme = isDarkModeEnabled ? darkTheme : lightTheme;

  //              <Suspense fallback={<CircularProgress />}>
  //const NewTask = React.lazy(() => import('./newtask'));


  useEffect(() => {
    if (isInitial) {
      dispatch(fetchCategoriesData());
      dispatch(fetchTasksData());
      dispatch(fetchGroupsData());
      isInitial = false;
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <div className="App">
          <Sidebar />
          <Container maxWidth="lg">
            <Routes>

              <Route path='/newtask' element={<NewTask />} />
              <Route path='/' element={<UserTasks />} />
              <Route path='/user-tasks' element={<UserTasks />} />
              <Route path='/user-created-tasks' element={<UserCreatedTasks />} />
              <Route path='/group-tasks' element={<GroupTasks />} />
              <Route path='/tasks/:taskId' element={<TaskDetail />} />
              <Route path='/search' element={<Search />} />
              <Route path='/manage-tasks-data' element={<ManageTasksData />} />
              <Route path='/manage-users-data' element={<ManageUsersData />} />
              <Route path='/account' element={<Account />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Container>
        </div>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
