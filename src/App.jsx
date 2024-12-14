import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  ThemeToggle,
  useTheme,
  themeColors,
} from "./components/Themes.jsx";
import BudgetTable from "./components/BudgetTable.jsx";
import BudgetForm from "./components/BudgetForm.jsx";
import EditModal from "./components/EditModal.jsx";
import DeleteModal from "./components/DeleteModal.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  const { theme } = useTheme();
  const [budgetData, setBudgetData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const categories = [
    "Alimentação",
    "Transporte",
    "Lazer",
    "Saúde",
    "Educação",
    "Moradia",
    "Serviços",
    "Roupas",
    "Tecnologia",
    "Entretenimento",
    "Viagens",
    "Impostos",
    "Beleza e Estética",
    "Não definida",
  ];

  const loadBudgetData = async () => {
    // Aqui você deve implementar a lógica para buscar dados da API do Google Sheets usando Sheet2API.
    try {
      const response = await fetch("SUA_API_DO_GOOGLE_SHEETS");
      const data = await response.json();
      setBudgetData(data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const addRow = (newRow) => {
    setBudgetData([...budgetData, newRow]);
    // Chame a função para adicionar a nova linha ao Google Sheets aqui.
  };

  const deleteRow = (index) => {
    const newBudgetData = budgetData.filter((_, i) => i !== index);
    setBudgetData(newBudgetData);
    // Chame a função para remover a linha do Google Sheets aqui.
  };

  const editRow = (index) => {
    setEditingItem({ ...budgetData[index], index });
  };

  const saveEditedRow = (editedItem) => {
    const newBudgetData = [...budgetData];
    newBudgetData[editedItem.index] = {
      produto: editedItem.produto,
      categoria: editedItem.categoria,
      quantidade: editedItem.quantidade,
      data: editedItem.data,
      custo: editedItem.custo,
      total: editedItem.total,
    };
    setBudgetData(newBudgetData);
    // Chame a função para atualizar a linha no Google Sheets aqui.
    setEditingItem(null);
  };

  const closeEditModal = () => {
    setEditingItem(null);
  };

  const openDeleteModal = (index) => {
    setDeletingIndex(index);
  };

  const closeDeleteModal = () => {
    setDeletingIndex(null);
  };

  const confirmDelete = () => {
    deleteRow(deletingIndex);
    closeDeleteModal();
  };

  useEffect(() => {
    loadBudgetData();
  }, []);

  // Filtro de dados com base na categoria selecionada
  const filteredBudgetData = budgetData.filter(
    (item) =>
      selectedCategory === "Todas" || item.categoria === selectedCategory
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${themeColors[theme].background}`}
    >
      <ThemeToggle />

      <h1 className="font-bold text-2xl text-center p-4">
        Gerenciador Financeiro
      </h1>

      <div className="container px-4 mx-auto relative overflow-y-auto rounded-xl md:max-w-[75%]">
        <div className={`p-4 mb-2 rounded-lg ${themeColors[theme].container}`}>
          <BudgetForm
            addRow={addRow}
            categories={categories}
            theme={theme}
            themeColors={themeColors}
          />
        </div>

        <h2 className="text-xl text-center p-2">
          Visualize as suas despesas aqui:
        </h2>

        {/* Componente de seleção de categoria */}
        Filtre por categoria:
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={`m-4 p-1 border rounded ${themeColors[theme].input}`}
        >
          <option value="Todas">Todas</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className={`px-4 rounded-lg ${themeColors[theme].container}`}>
          <BudgetTable
            budgetData={filteredBudgetData}
            deleteRow={openDeleteModal}
            editRow={editRow}
            categories={categories}
            selectedCategory={selectedCategory}
            theme={theme}
            themeColors={themeColors}
          />
        </div>

        {editingItem && (
          <EditModal
            isOpen={!!editingItem}
            onClose={closeEditModal}
            item={editingItem}
            onSave={saveEditedRow}
            categories={categories}
            theme={theme}
            themeColors={themeColors}
          />
        )}

        {deletingIndex !== null && (
          <DeleteModal
            isOpen={deletingIndex !== null}
            onClose={closeDeleteModal}
            onConfirm={confirmDelete}
            theme={theme}
            themeColors={themeColors}
          />
        )}
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
};

const BudgetManager = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

export default BudgetManager;
