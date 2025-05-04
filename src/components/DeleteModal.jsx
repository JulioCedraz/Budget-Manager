import React from "react";
import { X } from "lucide-react";
import { useTheme } from '../context/Themes';

const DeleteModal = ({ 
  isOpen, 
  onClose, 
  onConfirm 
}) => {
  const { theme, themeColors } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`rounded-lg p-6 w-96 relative ${themeColors[theme].container}`}>
        <button
          onClick={onClose}
          className={`absolute top-2 right-2 ${theme === 'light' 
            ? 'text-gray-700 hover:text-gray-500' 
            : 'text-gray-100 hover:text-gray-300'}`}
        >
          <X />
        </button>
        <h2 className={`text-xl font-bold mb-4 `}>
          Confirmar Exclusão
        </h2>
        <p>
          Você tem certeza que deseja excluir este item?
        </p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className={`rounded-md p-2 ${theme === 'light' 
              ? 'bg-gray-400 text-gray-700 hover:bg-gray-300' 
              : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`text-white rounded-md p-2 ${themeColors[theme].button.delete}`}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;