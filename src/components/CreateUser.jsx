
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


/**
 * Componente para crear un nuevo usuario con selección de commodities.
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.name - Nombre del usuario.
 * @param {Array} props.commodities - Lista de commodities seleccionadas.
 * @param {function} props.onCreateUser - Función llamada al crear un nuevo usuario.
 * @param {function} props.redirectToHome - Función para redirigir a la página principal.
 */
const CreateUser = ({ onCreateUser , redirectToHome}) => {
    const [successMessage, setSuccessMessage] = useState('');

    /**
     * Estado del formulario.
     * @type {Object}
     * @property {string} name - Nombre del usuario.
     * @property {Array<Object>} commodities - Lista de commodities seleccionadas.
     */
    const [formData, setFormData] = useState({
      name: '',
      commodities: [],
    });
  
    /**
     * Estado de la commodity seleccionada.
     * @type {string}
     */
    const [selectedCommodity, setSelectedCommodity] = useState('');
  
    /**
     * Estado de la cantidad de la commodity.
     * @type {number}
     */
    const [commodityQuantity, setCommodityQuantity] = useState(1);
  
    /**
     * Maneja el cambio en los campos del formulario.
     * @param {Object} e - Evento de cambio.
     */
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === 'commodities' ? [...prevData.commodities, value] : value,
      }));
    };
  
    /**
     * Maneja la adición de una commodity.
     */
    const handleAddCommodity = () => {
      if (selectedCommodity && !formData.commodities.includes(selectedCommodity)) {
        setFormData((prevData) => ({
          ...prevData,
          commodities: [
            ...prevData.commodities,
            { name: selectedCommodity, quantity: commodityQuantity },
          ],
        }));
        setSelectedCommodity('');
        setCommodityQuantity(1);
      }
    };
  
    /**
     * Maneja la eliminación de una commodity.
     * @param {string} commodityName - Nombre de la commodity a eliminar.
     */
    const handleRemoveCommodity = (commodityName) => {
      setFormData((prevData) => ({
        ...prevData,
        commodities: prevData.commodities.filter((c) => c.name !== commodityName),
      }));
    };
  
    /**
     * Maneja el envío del formulario.
     * @param {Object} e - Evento de envío.
     */
    const handleSubmit = (e) => {
      e.preventDefault();
      if (validateForm()) {
        const id = uuidv4();
        const newUser = {
          id,
          name: formData.name,
          commodities: formData.commodities,
        };
  
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsers = [...existingUsers, newUser];
  
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        onCreateUser(newUser);
  
        setFormData({
          name: '',
          commodities: [],
        });
        setSuccessMessage('Usuario creado correctamente');
        setTimeout(() => {
          
            redirectToHome();
          }, 2000);
      }
    };
  
    /**
     * Valida el formulario antes de enviar.
     * @returns {boolean} - `true` si el formulario es válido, `false` de lo contrario.
     */
    const validateForm = () => {
      return formData.name && formData.commodities.length > 0;
    };
  return (
    <div>
      <h2>Crear Nuevo Usuario</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
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
