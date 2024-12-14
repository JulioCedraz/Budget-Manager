import React from "react";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { useTheme } from "./Themes.jsx";

const BudgetTable = ({ budgetData, editRow, deleteRow }) => {
  const { theme, themeColors } = useTheme();

  return (
    <div className="overflow-x-auto text-nowrap py-2">
      <table
        className={`my-2 w-full text-center border-2 rounded-md ${themeColors[theme].tableBorder}`}
      >
        <thead>
          <tr className={`${themeColors[theme].tableHeader}`}>
            <th className="p-2">Produto</th>
            <th className="p-2">Categoria</th>
            <th className="p-2">Quantidade</th>
            <th className="p-2">Custo (un)</th>
            <th className="p-2">Total (R$)</th>
            <th className="p-2">Data</th>
            <th className="p-2">Editar/Apagar</th>
          </tr>
        </thead>
        <tbody>
          {budgetData.length === 0 ? (
            <tr>
              <td colSpan={7} className="p-4 text-center">
                Nenhuma despesa encontrada para esta categoria.
              </td>
            </tr>
          ) : (
            budgetData.map((item, index) => (
              <tr
                key={index}
                className={`border-2 ${themeColors[theme].tableBorder}`}
              >
                <td className="p-2">{item.produto}</td>
                <td>{item.categoria}</td>
                <td>{item.quantidade}</td>
                <td>{item.custo}</td>
                <td>{item.total}</td>
                <td>{item.data}</td>

                <td>
                  <button
                    onClick={() => editRow(index)}
                    title="Editar"
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetTable;
