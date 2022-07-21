import Sidebar from './components/Sidebar/Sidebar';
import NewTask from './pages/NewTask/NewTask';
import Tasks from './pages/Tasks/Tasks';

import { Routes, Route } from "react-router-dom";

import './App.css';

import Container from '@mui/material/Container';


function App() {
  return (
    <div className="App">
      <Sidebar />
      <Container maxWidth="lg" sx={{}}>
        <Routes>
          <Route path='newtask' element={<NewTask />} />
          <Route path='tasks' element={<Tasks />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
