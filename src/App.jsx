import React, { useState, useEffect } from 'react';
import { ThemeProvider, ThemeToggle, useTheme, themeColors } from './components/Themes.jsx';
import BudgetTable from './components/BudgetTable.jsx';
import BudgetForm from './components/BudgetForm.jsx';
import EditModal from './components/EditModal.jsx';
import DeleteModal from './components/DeleteModal.jsx';

const App = () => {
  const { theme } = useTheme();
  const [budgetData, setBudgetData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingIndex, setDeletingIndex] = useState(null);

  const categories = [
    "Alimentação", "Transporte", "Lazer", "Saúde", "Educação", 
    "Moradia", "Serviços", "Roupas", "Tecnologia", 
    "Entretenimento", "Viagens", "Impostos", 
    "Beleza e Estética", "Não definido"
  ];

  const loadBudgetData = async () => {
    // Aqui você deve implementar a lógica para buscar dados da API do Google Sheets usando Sheet2API.
    try {
      const response = await fetch('SUA_API_DO_GOOGLE_SHEETS');
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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeColors[theme].background}`}>
      <div className="container mx-auto relative">
        <ThemeToggle />

        <h1 className="font-bold text-2xl text-center p-4">
          Gerenciador Financeiro
        </h1>

        <h2 className='text-xl p-2'>Controle todos os seus gastos aqui!</h2>

        <div className={`p-4 rounded-lg ${themeColors[theme].container}`}>
          <BudgetForm 
            addRow={addRow} 
            categories={categories} 
            theme={theme}
            themeColors={themeColors}
          />
          
          <BudgetTable 
            budgetData={budgetData} 
            deleteRow={openDeleteModal}
            editRow={editRow}
            categories={categories}
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