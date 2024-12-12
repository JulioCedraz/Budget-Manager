import React from "react";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { useTheme } from './Themes.jsx';

const BudgetTable = ({ budgetData, editRow, deleteRow }) => {
  const { theme, themeColors } = useTheme();

  return (
    <table className={`m-1 mt-4 w-[98%] text-center border-2 rounded-md ${themeColors[theme].tableBorder}`}>
      <thead>
        <tr className={`border-2 rounded-md text-xs sm:text-sm md:text-base ${themeColors[theme].tableHeader}`}>
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
          <tr key={index} className={`text-xs sm:text-sm md:text-base border-4 ${themeColors[theme].tableBorder}`}>
            <td>{item.produto}</td>
            <td>{item.categoria}</td>
            <td>{item.quantidade}</td>
            <td>{item.custo}</td>
            <td>{item.total}</td>
            <td>{item.data}</td>

            <td>
              <button
                onClick={() => editRow(index)}
                title="Corrigir"
                className={`text-white rounded-md m-1 p-1 ${themeColors[theme].button.edit}`}
              >
                <Edit2Icon />
              </button>

              <button
                onClick={() => deleteRow(index)}
                title="Apagar"
                className={`text-white rounded-md m-1 p-1 ${themeColors[theme].button.delete}`}
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