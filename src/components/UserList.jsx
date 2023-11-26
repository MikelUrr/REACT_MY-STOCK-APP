import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * Componente para mostrar la lista de usuarios.
 * @component
 */
const UserList = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      // Cargar la lista de usuarios desde localStorage al montar el componente
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      setUsers(storedUsers);
    }, []);
  
    const handleSearchChange = (e) => {
      // Actualizar el término de búsqueda al cambiar el input
      setSearchTerm(e.target.value);
    };
  
    const filteredUsers = users.filter((user) => {
      // Filtrar usuarios según el término de búsqueda
      const searchValue = searchTerm.toLowerCase();
      return user.name.toLowerCase().includes(searchValue);
    });
  
    return (
      <div>
        <h2>Lista de Usuarios</h2>
        <input
          type="text"
          placeholder="Buscar usuario"
          value={searchTerm}
          onChange={handleSearchChange}
        />
  
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Commodities</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.commodities?.map((c) => c.name).join(', ')}</td>
                <td>
                  <Link to={`/user-detail/${user.id}`}>Detalles</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default UserList;
