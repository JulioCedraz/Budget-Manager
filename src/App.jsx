import React, { useState, useContext } from "react";
import {
  ThemeProvider,
  ThemeToggle,
  useTheme,
  themeColors,
} from "../src/context/Themes";
import { PDFDownloadLink } from "@react-pdf/renderer";
import BudgetReport from "./components/BudgetReport";
import BudgetTable from "./components/BudgetTable.jsx";
import BudgetForm from "./components/BudgetForm.jsx";
import EditModal from "./components/EditModal.jsx";
import DeleteModal from "./components/DeleteModal.jsx";
import Footer from "./components/Footer.jsx";
import { AuthProvider, AuthContext } from "./context/AuthProvider";
import LoginPage from "./components/LoginPage";
import UserInfo from "./components/UserInfo";

const AppContent = () => {
  const { usuario } = useContext(AuthContext);
  const { theme } = useTheme();
  const [budgetData, setBudgetData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [pdfFileName, setPdfFileName] = useState("Minhas despesas");

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

  const addRow = (newRow) => setBudgetData([...budgetData, newRow]);
  const deleteRow = (index) => setBudgetData(budgetData.filter((_, i) => i !== index));
  const editRow = (index) => setEditingItem({ ...budgetData[index], index });
  const saveEditedRow = (editedItem) => {
    const newBudgetData = [...budgetData];
    newBudgetData[editedItem.index] = { ...editedItem };
    setBudgetData(newBudgetData);
    setEditingItem(null);
  };

  const closeEditModal = () => setEditingItem(null);
  const openDeleteModal = (index) => setDeletingIndex(index);
  const closeDeleteModal = () => setDeletingIndex(null);
  const confirmDelete = () => {
    deleteRow(deletingIndex);
    closeDeleteModal();
  };

  const filteredBudgetData = budgetData.filter(
    (item) => selectedCategory === "Todas" || item.categoria === selectedCategory
  );

  if (!usuario) {
    return <LoginPage />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeColors[theme].background}`}>
      <div className="p-4">
        <div className="container mx-auto flex justify-between items-center mb-4">
          <ThemeToggle />
          <UserInfo />
        </div>

        <h1 className="font-bold text-2xl text-center p-4">Gestor de Despesas</h1>

        <div className="container px-4 mx-auto relative overflow-y-auto rounded-xl md:max-w-[70%]">
          <div className={`p-4 mb-2 rounded-lg ${themeColors[theme].container}`}>
            <BudgetForm
              addRow={addRow}
              categories={categories}
              theme={theme}
              themeColors={themeColors}
            />
          </div>

          <h2 className="text-xl text-center p-2">Manipule o seu relatório:</h2>

          <div className="flex flex-col justify-between items-center m-2 lg:flex-row">
            <div className="flex items-center mb-4 lg:mb-0">
              <label htmlFor="category-select" className="mr-2">Categoria:</label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`p-1 border rounded ${themeColors[theme].input}`}
              >
                <option value="Todas">Todas</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center sm:mt-0">
              <input
                type="text"
                value={pdfFileName}
                onChange={(e) => setPdfFileName(e.target.value)}
                placeholder="Nome do relatório"
                className={`p-2 border rounded ${themeColors[theme].input}`}
              />
              <PDFDownloadLink
                document={<BudgetReport budgetData={filteredBudgetData} />}
                fileName={`${pdfFileName}.pdf`}
                className={`ml-2 p-2 ${themeColors[theme].button.add} text-white rounded`}
              >
                {({ loading }) => (loading ? "Gerando PDF..." : "Baixar em PDF")}
              </PDFDownloadLink>
            </div>
          </div>

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
    </div>
  );
};

const BudgetManager = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default BudgetManager;