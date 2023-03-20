import React, { useCallback, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { auth } from './util/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { readUserData } from './lib/api';
import { authActions } from './store/auth';

import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import RegisterUser from './pages/RegisterUser';
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
import Bar from './components/Bar/Bar';
import Theme from './UI/Theme';

import { Box, Container } from '@mui/material';

const App = () => {

  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const userGroup = useSelector(state => state.auth.userData.group)

  const dispatchUserData = useCallback((userData) => {
    dispatch(authActions.signIn(userData));
  }, [dispatch]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        readUserData(user.uid, dispatchUserData);
      } else {
        dispatch(authActions.signOut());
      }
    });
  }, [dispatch, dispatchUserData])

  const PrivateRoutes = () => token ? <Outlet /> : <Navigate to='/sign-in' />
  const AdminRoutes = () => token && (userGroup === 'Helpdesk') ? <Outlet /> : <Navigate to='/user-tasks' />
  const RedirectLoggedUser = () => token ? <Navigate to='/user-tasks' /> : <Outlet />

  return (
    <Theme>
      {token && <Bar />}
      <Box sx={{ display: 'flex' }}>
        {token && <Sidebar />}
        <Container>

          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path='/' element={<UserTasks />} />
              <Route path='/newtask' element={<NewTask />} />
              <Route path='/user-tasks' element={<UserTasks />} />
              <Route path='/user-created-tasks' element={<UserCreatedTasks />} />
              <Route path='/group-tasks' element={<GroupTasks />} />
              <Route path='/tasks/:taskId' element={<TaskDetail />} />
              <Route path='/search' element={<Search />} />
              <Route path='/account' element={<Account />} />
              <Route path='*' element={<NotFound />} />
              <Route element={<AdminRoutes />}>
                <Route path='/manage-categories' element={<ManageCategoriesData />} />
                <Route path='/manage-groups' element={<ManageGroupsData />} />
                <Route path='/manage-users' element={<ManageUsersData />} />
                <Route path='/register-user' element={<RegisterUser />} />
              </Route>
            </Route>
            <Route element={<RedirectLoggedUser />}>
              <Route path='/sign-in' element={<SignIn />} />
            </Route>
          </Routes>

        </Container>
      </Box>
    </Theme>
  );
};

export default App;