import React, { useState, useEffect } from 'react';
import BudgetTable from './components/BudgetTable.jsx';
import BudgetForm from './components/BudgetForm.jsx';
import EditModal from './components/EditModal.jsx';
import DeleteModal from './components/DeleteModal.jsx';

const App = () => {
  const [budgetData, setBudgetData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingIndex, setDeletingIndex] = useState(null); // Estado para controlar qual item está sendo deletado

  const categories = [
    "Alimentação", "Transporte", "Lazer", "Saúde", "Educação", 
    "Moradia", "Serviços", "Roupas", "Tecnologia", 
    "Entretenimento", "Viagens", "Impostos", 
    "Beleza e Estética", "Não definido"
  ];

  const loadBudgetData = async () => {
    // Aqui você deve implementar a lógica para buscar dados da API do Google Sheets usando Sheet2API.
    const response = await fetch('SUA_API_DO_GOOGLE_SHEETS');
    const data = await response.json();
    setBudgetData(data);
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

// -----------------------------------------------------------------------
// -----------------------------------------------------------------------

  return (
    <div className="container mx-auto">
      <h1 className='font-bold text-2xl text-center p-4'>Gerenciador de Orçamento</h1>
      <BudgetForm addRow={addRow} categories={categories} />
      <BudgetTable 
        budgetData={budgetData} 
        deleteRow={openDeleteModal} // Passa a função para abrir o modal
        editRow={editRow}
        categories={categories}
      />
      {editingItem && (
        <EditModal 
          isOpen={!!editingItem} 
          onClose={closeEditModal}
          item={editingItem}
          onSave={saveEditedRow}
          categories={categories}
        />
      )}
      {deletingIndex !== null && (
        <DeleteModal 
          isOpen={deletingIndex !== null} 
          onClose={closeDeleteModal} 
          onConfirm={confirmDelete} // Passa a função de confirmação
        />
      )}
    </div>
  );
};

export default App;