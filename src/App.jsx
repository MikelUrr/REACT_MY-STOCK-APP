import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateUser from './components/CreateUser';

const App = () => {
  const [users, setUsers] = useState([]);

  const handleCreateUser = (userData) => {
    setUsers([...users, userData]);
    // Puedes realizar otras acciones según tus necesidades
  };

  return (
    <Router>
      <div>
        {/* ... (otros elementos del componente) */}

        <Routes>
          <Route path="/" element={<p>Usuarios Guardados...</p>} />
          <Route
            path="/create"
            element={<CreateUser onCreateUser={handleCreateUser} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
