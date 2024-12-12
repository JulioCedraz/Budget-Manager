import React from "react";
import { Edit2Icon, Trash2Icon } from "lucide-react";

const BudgetTable = ({ budgetData, editRow , deleteRow}) => {
  return (
    <table className="m-1 mt-4 w-[98%] bg-slate-200 text-center border-2 border-gray-300 rounded-md">
      <thead>
        <tr className="bg-gray-300 border-2 border-gray-300 rounded-md text-xs sm:text-sm md:text-base">
          <th>Produto</th>
          <th>Categoria</th>
          <th>Quantidade</th>
          <th>Custo (un)</th>
          <th>Total (R$)</th>
          <th>Data</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {budgetData.map((item, index) => (
          <tr key={index} className="text-xs sm:text-sm md:text-base border-4 border-gray-300 ">
            <td>{item.produto}</td>
            <td>{item.categoria}</td>
            <td>{item.quantidade}</td>
            <td>{item.custo}</td>
            <td>{item.total}</td>
            <td>{item.data}</td>

            <td>
              {/* Botão de edição */}
              <button
                onClick={() => editRow(index)}
                title="Corrigir"
                className="bg-slate-500 text-white rounded-md hover:bg-slate-600 m-1 p-1"
              >
                <Edit2Icon />
              </button>

              {/* Botão de exclusão */}
              <button
                onClick={() => deleteRow(index)} // Agora chama openDeleteModal
                title="Apagar"
                className="bg-red-500 text-white rounded-md hover:bg-red-600 m-1 p-1"
              >
                <Trash2Icon />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BudgetTable;