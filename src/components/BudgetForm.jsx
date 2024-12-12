import React, { useState } from "react";
import { useTheme } from './Themes.jsx';

const BudgetForm = ({ addRow, categories }) => {
  const [produto, setProduto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [custo, setCusto] = useState("");
  const [data, setData] = useState("");

  const { theme, themeColors } = useTheme();

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
    <form onSubmit={handleSubmit} className="flex flex-col items-start">
      <div className="m-2 w-[98%]">
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

      <div className="m-2 w-[98%]">
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

      <div className="m-2 w-[98%]">
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

      <div className="m-2 w-[98%]">
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

      <div className="m-2 w-[98%]">
        <label htmlFor="data" className={`block mb-1`}>
          Data:
        </label>
        <input
          type="date"
          id="data"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
          className={`border rounded-md p-1 w-[98%] ${themeColors[theme].input}`}
        />
      </div>

      <button
        type="submit"
        className={`cursor-pointer duration-300 m-2 text-white rounded-md p-2 ${themeColors[theme].button.add}`}
        title="Adicionar item"
      >
        Adicionar item
      </button>
    </form>
  );
};

export default BudgetForm;