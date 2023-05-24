import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import RootLayout from "./UI/RootLayout";
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import TasksViews from './pages/TasksViews';
import RegisterUser from './pages/RegisterUser';
import NewTask from './pages/NewTask';
import Search from './pages/Search';
import TaskDetail from './pages/TaskDetail';
import ManageCategoriesData from './pages/ManageCategoriesData';
import ManageGroupsData from './pages/ManageGroupsData';
import ManageUsersData from './pages/ManageUsersData';
import Account from './pages/Account';


const App = () => {

  const isUserLoggedIn = localStorage.getItem('itckets-uid');
  const userRole = useSelector(state => state.auth.userData.role);

  const PrivateRoutes = () => isUserLoggedIn ? <Outlet /> : <Navigate to='/sign-in' />
  const AdminRoutes = () => (userRole === 'admin') ? <Outlet /> : <Navigate to='/user-tasks' />
  const RedirectLoggedUser = () => userRole ? <Navigate to='/user-tasks' /> : <Outlet />

  return (
    <RootLayout>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<TasksViews />} />
          <Route path='/newtask' element={<NewTask />} />
          <Route path='/user-tasks' element={<TasksViews />} />
          <Route path='/user-created-tasks' element={<TasksViews />} />
          <Route path='/group-tasks' element={<TasksViews />} />
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
    </RootLayout>
  );
};

export default App;