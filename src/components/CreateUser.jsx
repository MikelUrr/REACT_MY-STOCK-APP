// CreateUser.js

import React, { useState } from 'react';

const CreateUser = ({ onCreateUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    commodities: [],
  });

  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [commodityQuantity, setCommodityQuantity] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddCommodity = () => {
    if (selectedCommodity && !formData.commodities.includes(selectedCommodity)) {
      setFormData((prevData) => ({
        ...prevData,
        commodities: [
          ...prevData.commodities,
          { name: selectedCommodity, quantity: commodityQuantity },
        ],
      }));

      // Limpiar el estado de selección después de agregar la commodity
      setSelectedCommodity('');
      setCommodityQuantity(1);
    }
  };

  const handleRemoveCommodity = (commodityName) => {
    setFormData((prevData) => ({
      ...prevData,
      commodities: prevData.commodities.filter((c) => c.name !== commodityName),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Llamar a la función de creación de usuario del padre
      onCreateUser(formData);
      // Limpiar el formulario después de enviar
      setFormData({
        name: '',
        commodities: [],
      });
    }
  };

  const validateForm = () => {
    // Implementa lógica de validación según tus requisitos
    return formData.name && formData.commodities.length > 0;
  };

  return (
    <div>
      <h2>Crear Nuevo Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <label>Commodities:</label>
        <div>
          <select
            value={selectedCommodity}
            onChange={(e) => setSelectedCommodity(e.target.value)}
            required
          >
            <option value="">Seleccionar Commodity</option>
            <option value="WTI"> Oil: West Texas Intermediate (WTI) </option>
            <option value="BRENT">Oil: Brent (Europe)</option>
            <option value="NATURAL_GAS">Natural Gas</option>
            <option value="COPPER">Copper</option>
            <option value="ALUMINUM">Aluminum</option>
            <option value="WHEAT">Wheat</option>
            <option value="CORN">Corn</option>
            <option value="COTTON">Cotton</option>
            <option value="SUGAR">Sugar</option>
            <option value="COFFEE">Coffee</option>
          </select>
          <input
            type="number"
            value={commodityQuantity}
            onChange={(e) => setCommodityQuantity(e.target.value)}
            min="1"
          />
          <button type="button" onClick={handleAddCommodity}>
            Agregar Commodity
          </button>
        </div>

        <div>
          <h3>Commodities Seleccionadas:</h3>
          <ul>
            {formData.commodities.map((commodity, index) => (
              <li key={index}>
                {commodity.name} - Cantidad: {commodity.quantity}
                <button
                  type="button"
                  onClick={() => handleRemoveCommodity(commodity.name)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  );
};

export default CreateUser;
