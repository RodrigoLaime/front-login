import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register'
import Login from './components/Login.jsx'
import Welcome from './components/Welcome.jsx'

import styles from './App.module.scss';

function App() {
  return (
    <Router className="App">
      <div className={styles.container}>
        <Routes className >
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/welcome/:id' element={<Welcome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
