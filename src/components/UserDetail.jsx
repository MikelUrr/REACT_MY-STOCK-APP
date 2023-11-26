import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Plotly from 'plotly.js-basic-dist';

const UserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [selectedInterval, setSelectedInterval] = useState('monthly');
  const [commodityData, setCommodityData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://www.alphavantage.co/query?function=CORN&interval=${selectedInterval}&apikey=demo`);
        const data = await response.json();
        console.log()
        setCommodityData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedInterval]);

  const handleDeleteUser = () => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = existingUsers.filter(user => user.id !== userId);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    navigate.push('/');
  };

  return (
    <div>
      <h2>User Details</h2>
      <div>
        <label htmlFor="intervalSelect">Seleccionar Intervalo: </label>
        <select
          id="intervalSelect"
          value={selectedInterval}
          onChange={(e) => setSelectedInterval(e.target.value)}
        >
          <option value="monthly">Mensual</option>
          <option value="quarterly">Trimestral</option>
          <option value="annual">Anual</option>
        </select>
      </div>
      {commodityData && commodityData.dates && commodityData.values && (
        <div>
          {/* Renderizar gráficos y detalles del usuario */}
          <Plotly
            data={[
              {
                x: commodityData.dates,
                y: commodityData.values,
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'blue' },
              },
            ]}
            layout={{ width: 600, height: 400, title: 'Gráfico de Commodity' }}
          />
        </div>
      )}
      <button onClick={handleDeleteUser}>Borrar Usuario</button>
    </div>
  );
};

export default UserDetail;