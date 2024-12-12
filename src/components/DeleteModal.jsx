import React from "react";
import { X } from "lucide-react";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X />
        </button>
        <h2 className="text-xl font-bold mb-4">Confirmar Exclusão</h2>
        <p>Você tem certeza que deseja excluir este item?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 rounded-md p-2 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;