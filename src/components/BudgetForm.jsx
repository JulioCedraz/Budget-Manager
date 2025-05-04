import React, { useState } from "react";
import { useTheme } from "../context/Themes";

const BudgetForm = ({ addRow, categories }) => {
  const [produto, setProduto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [custo, setCusto] = useState("");
  const [data, setData] = useState("");

  const { theme, themeColors } = useTheme();

  const isFormComplete =
    produto.trim() !== "" &&
    categoria !== "" &&
    quantidade.trim() !== "" &&
    custo.trim() !== "" &&
    data.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();

    const total = (quantidade * custo).toFixed(2);

    addRow({ produto, categoria, quantidade, custo, total, data });

    // Limpar os campos após o envio
    setProduto("");
    setCategoria("");
    setQuantidade("");
    setData("");
    setCusto("");
  };

  return (
    <form onSubmit={handleSubmit} className="mx-6">
      <div className="m-2 mb-4">
        <label htmlFor="produto" className={`block mb-1`}>
          Produto:
        </label>
        <input
          type="text"
          id="produto"
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
          placeholder="Informe o produto"
          required
          className={`border rounded-md p-1 w-[98%] ${themeColors[theme].input}`}
        />
      </div>

      <div className="m-2 mb-4">
        <label htmlFor="categoria" className={`block mb-1`}>
          Categoria:
        </label>
        <select
          id="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
          className={`border rounded-md p-1 w-[98%] ${themeColors[theme].input}`}
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="m-2 mb-4">
        <label htmlFor="quantidade" className={`block mb-1`}>
          Quantidade:
        </label>
        <input
          type="number"
          id="quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          placeholder="Digite a quantidade"
          required
          className={`border rounded-md p-1 w-[98%] ${themeColors[theme].input}`}
        />
      </div>

      <div className="m-2 mb-4">
        <label htmlFor="custo" className={`block mb-1`}>
          Custo por unidade em R$:
        </label>
        <input
          type="number"
          id="custo"
          value={custo}
          onChange={(e) => setCusto(e.target.value)}
          placeholder="Custo"
          required
          className={`border rounded-md p-1 w-[98%] ${themeColors[theme].input}`}
        />
      </div>

      <div className="m-2 mb-4">
        <label htmlFor="data" className={`block mb-1`}>
          Data:
        </label>
        <input
          type="date"
          id="data"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
          min="1900-01-01"
          max="2099-12-31"
          className={`border rounded-md p-1 w-[98%] ${themeColors[theme].input}`}
        />
      </div>

      <button
        type="submit"
        disabled={!isFormComplete}
        className={`duration-300 m-2 p-2 text-white rounded-md 
          ${
            isFormComplete
              ? `${themeColors[theme].button.add} cursor-pointer`
              : "bg-gray-400 cursor-not-allowed"
          }
      `}
        title="Adicionar item"
      >
        Adicionar item
      </button>
    </form>
  );
};

export default BudgetForm;
