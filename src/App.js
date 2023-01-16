import React from 'react';
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';
import Sidebar from './components/Sidebar/Sidebar';
import NewTask from './pages/NewTask';
import GroupTasks from './pages/GroupTasks';
import Search from './pages/Search';
import TaskDetail from './pages/TaskDetail';
import UserTasks from './pages/UserTasks';
import UserCreatedTasks from './pages/UserCreatedTasks';
import ManageCategoriesData from './pages/ManageCategoriesData';
import ManageGroupsData from './pages/ManageGroupsData';
import ManageUsersData from './pages/ManageUsersData';
import Account from './pages/Account';

import { ThemeProvider, createTheme, Container, CssBaseline } from '@mui/material';
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

const PrivateRoutes = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  return (
    isLoggedIn ? <Outlet /> : <Navigate to='/sign-in' />
  )
};


const App = () => {

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const isDarkModeEnabled = useSelector(state => state.ui.isDarkModeEnabled);
  const theme = isDarkModeEnabled ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <div className="App">
          {isLoggedIn && <Sidebar />}
          <Container maxWidth="lg">

            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path='/' element={<UserTasks />} />
                <Route path='/sign-out' element={<SignOut />} />
                <Route path='/newtask' element={<NewTask />} />
                <Route path='/user-tasks' element={<UserTasks />} />
                <Route path='/user-created-tasks' element={<UserCreatedTasks />} />
                <Route path='/group-tasks' element={<GroupTasks />} />
                <Route path='/tasks/:taskId' element={<TaskDetail />} />
                <Route path='/search' element={<Search />} />
                <Route path='/account' element={<Account />} />
                <Route path='/manage-categories' element={<ManageCategoriesData />} />
                <Route path='/manage-groups' element={<ManageGroupsData />} />
                <Route path='/manage-users' element={<ManageUsersData />} />
                <Route path='*' element={<NotFound />} />
              </Route>

              <Route path='/sign-in' element={<SignIn />} />

            </Routes>

          </Container>
        </div>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;


  //<Suspense fallback={<CircularProgress />}>
  //const NewTask = React.lazy(() => import('./newtask'));