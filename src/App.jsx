import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateUser from './components/CreateUser';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';



const App = () => {
  const [users, setUsers] = useState([]);
 

  const handleCreateUser = (userData) => {
    setUsers([...users, userData]);
    // Puedes realizar otras acciones según tus necesidades
  };
  const redirectToHome = () => {
    // Redirige a la página principal
    window.location.href = '/';
  };


  return (
    <Router>
      <div>
        {/* Botón para redirigir a la creación de usuario */}
        <Link to="/create">
          <button>Crear Nuevo Usuario</button>
        </Link>
        <Link to="/list">
          <button>Listado de Usuarios</button>
        </Link>
        

        {/* Rutas */}
        <Routes>
        <Route path="/list" element={<UserList users={users} />} />
          <Route
            path="/create"
            element={<CreateUser onCreateUser={handleCreateUser} redirectToHome={redirectToHome} />}
          />
          <Route path="/user-detail/:userId" element={<UserDetail />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;