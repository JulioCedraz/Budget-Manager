import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Estilos aprimorados para o documento PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
    color: '#2C3E50',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'right',
    color: '#7F8C8D',
  },
  table: {
    display: 'table',
    width: '100%',
    borderWidth: 1,
    borderColor: '#BDC3C7',
    borderStyle: 'solid',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#BDC3C7',
    minHeight: 35,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#34495E',
    color: '#FFFFFF',
  },
  tableHeaderCell: {
    fontSize: 12,
    fontWeight: 'bold',
    padding: 8,
    textAlign: 'center',
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#BDC3C7',
  },
  tableCell: {
    fontSize: 10,
    padding: 8,
    textAlign: 'center',
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#BDC3C7',
  },
  lastCell: {
    borderRightWidth: 0,
  },
  oddRow: {
    backgroundColor: '#F8F9F9',
  },
  totalsSection: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ECF0F1',
    borderRadius: 5,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 10,
  },
  totalValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2980B9',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 10,
    textAlign: 'center',
    color: '#95A5A6',
    borderTopWidth: 1,
    borderTopColor: '#BDC3C7',
    paddingTop: 10,
  },
});

// Formatar valores monetários
const formatCurrency = (value) => {
  return `R$ ${Number(value).toFixed(2).replace('.', ',')}`;
};

// Formatar datas para itens do formulário
const formatItemDate = (dateString) => {
  const date = new Date(dateString);
  // Ajusta o timezone adicionando o offset do timezone local porque estava mostrando 1 dia a menos do cadastro
  // O problema da data estava relacionado ao timezone. Quando uma data é convertida para string no JavaScript, ela usa o UTC-0 por padrão
  const timezoneOffset = date.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(date.getTime() + timezoneOffset);
  return adjustedDate.toLocaleDateString('pt-BR');
};

// Formatar a data atual de geração do relatório
const formatGenerationDate = () => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date());
};

// Componente principal
const BudgetReport = ({ budgetData = new Date() }) => {
  // Cálculo dos totais e contagem de produtos
  const totals = budgetData.reduce(
    (acc, item) => {
      acc.totalQuantity += Number(item.quantidade);
      acc.totalCost += Number(item.custo) * Number(item.quantidade);
      acc.totalProducts.add(item.produto);
      
      return acc;
    },
    { 
      totalProducts: new Set(),
      totalQuantity: 0, 
      totalCost: 0
    }
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Relatório de Despesas</Text>
        <Text style={styles.subtitle}>
          Gerado em: {formatGenerationDate()}
        </Text>

        <View style={styles.table}>
          {/* Cabeçalho da tabela */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableHeaderCell}>Produto</Text>
            <Text style={styles.tableHeaderCell}>Categoria</Text>
            <Text style={styles.tableHeaderCell}>Quantidade</Text>
            <Text style={styles.tableHeaderCell}>Custo Unit.</Text>
            <Text style={styles.tableHeaderCell}>Total</Text>
            <Text style={[styles.tableHeaderCell, styles.lastCell]}>Data</Text>
          </View>

          {/* Linhas da tabela */}
          {budgetData.map((item, index) => (
            <View 
              key={index} 
              style={[
                styles.tableRow,
                index % 2 === 1 && styles.oddRow
              ]}
            >
              <Text style={styles.tableCell}>{item.produto}</Text>
              <Text style={styles.tableCell}>{item.categoria}</Text>
              <Text style={styles.tableCell}>{item.quantidade}</Text>
              <Text style={styles.tableCell}>{formatCurrency(item.custo)}</Text>
              <Text style={styles.tableCell}>{formatCurrency(item.total)}</Text>
              <Text style={[styles.tableCell, styles.lastCell]}>
                {formatItemDate(item.data)}
              </Text>
            </View>
          ))}
        </View>

        {/* Seção de totais */}
        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total de produtos:</Text>
            <Text style={styles.totalValue}>
              {totals.totalProducts.size} produtos diferentes
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Quantidade total de itens:</Text>
            <Text style={styles.totalValue}>
              {totals.totalQuantity.toLocaleString('pt-BR')} itens
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Custo total:</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(totals.totalCost)}
            </Text>
          </View>
        </View>

        {/* Rodapé */}
        <Text style={styles.footer}>
          Este é um documento gerado automaticamente. Página 1 de 1
        </Text>
      </Page>
    </Document>
  );
};

export default BudgetReport;