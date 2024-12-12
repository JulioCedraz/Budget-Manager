import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useTheme } from './Themes.jsx';

const EditModal = ({ 
  isOpen, 
  onClose, 
  item, 
  onSave, 
  categories
}) => {
  const { theme, themeColors } = useTheme();
  const [editedItem, setEditedItem] = useState({ ...item });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calcular o total sempre que quantidade ou custo mudarem
    const calculatedTotal =
      (editedItem.quantidade || 0) * (editedItem.custo || 0);
    setTotal(calculatedTotal.toFixed(2));
  }, [editedItem.quantidade, editedItem.custo]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditedItem((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Adicionar o total ao item editado
    const updatedItem = { ...editedItem, total: total };

    onSave(updatedItem);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`rounded-lg p-6 w-96 relative ${themeColors[theme].container}`}>
        <button
          onClick={onClose}
          className={`absolute top-2 right-2 ${theme === 'light' ? 'text-gray-500 hover:text-gray-700' : 'text-gray-300 hover:text-gray-100'}`}
        >
          <X />
        </button>
        <h2 className={`text-xl font-bold mb-4`}>Editar item</h2>

        {/* Adicionando o formulário aqui para cada item ser validado independentemente */}
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label htmlFor="produto" className={`block mb-1`}>
              Produto:
            </label>
            <input
              type="text"
              id="produto"
              value={editedItem.produto}
              onChange={handleChange}
              required
              className={`border rounded-md p-1 w-full ${themeColors[theme].input}`}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="categoria" className={`block mb-1 `}>
              Categoria:
            </label>
            <select
              id="categoria"
              value={editedItem.categoria}
              onChange={handleChange}
              className={`border rounded-md p-1 w-full ${themeColors[theme].input}`}
              required
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Outros inputs seguem o mesmo padrão */}
          <div className="mb-4">
            <label htmlFor="quantidade" className={`block mb-1 `}>
              Quantidade:
            </label>
            <input
              type="number"
              id="quantidade"
              value={editedItem.quantidade}
              onChange={handleChange}
              required
              className={`border rounded-md p-1 w-full ${themeColors[theme].input}`}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="custo" className={`block mb-1 `}>
              Custo em R$:
            </label>
            <input
              type="number"
              id="custo"
              value={editedItem.custo}
              onChange={handleChange}
              required
              className={`border rounded-md p-1 w-full ${themeColors[theme].input}`}
            />
          </div>

          {/* Total calculado */}
          <div className="mb-4">
            <label className={`block mb-1 `}>Total:</label>
            <input
              type="text"
              value={`R$ ${total}`}
              readOnly
              className={`border rounded-md p-1 w-full bg-gray-100 cursor-not-allowed ${themeColors[theme].input}`}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="data" className={`block mb-1 `}>
              Data:
            </label>
            <input
              type="date"
              id="data"
              value={editedItem.data}
              onChange={handleChange}
              required
              className={`border rounded-md p-1 w-full ${themeColors[theme].input}`}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className={`rounded-md p-2 ${theme === 'light' 
                ? 'bg-gray-300 text-gray-700 hover:bg-gray-400' 
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`text-white rounded-md p-2 ${themeColors[theme].button.add}`}
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;