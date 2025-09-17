import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface InvoiceData {
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  items: InvoiceItem[];
  notes: string;
}

interface CompanyConfig {
  name: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  email: string;
  phone: string;
  website: string;
}

interface InvoiceTemplateProps {
  invoiceData: InvoiceData;
  companyConfig: CompanyConfig;
  logoDataUrl?: string | null;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.5,
    color: '#1f2937',
    padding: 40,
  },
  
  // Header Section
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  
  companyInfo: {
    flex: 1,
  },
  
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  
  companyAddress: {
    fontSize: 10,
    color: '#666',
    marginBottom: 2,
  },
  
  rightSection: {
    alignItems: 'flex-end',
  },
  
  // Logo styles
  logo: {
    width: 120,
    height: 60,
    marginBottom: 15,
  },
  
  // Fallback logo
  logoFallback: {
    width: 120,
    height: 60,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  
  logoFallbackText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  
  invoiceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  
  invoiceDetails: {
    fontSize: 10,
    marginBottom: 2,
  },
  
  // Client Section
  clientSection: {
    marginBottom: 30,
  },
  
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  
  clientInfo: {
    fontSize: 11,
    marginBottom: 2,
  },
  
  // Table
  table: {
    marginBottom: 20,
  },
  
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
  },
  
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  
  col1: { width: '50%' }, // Description
  col2: { width: '15%', textAlign: 'right' }, // Quantity
  col3: { width: '20%', textAlign: 'right' }, // Rate
  col4: { width: '15%', textAlign: 'right' }, // Amount
  
  tableHeaderText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  
  tableCellText: {
    fontSize: 10,
  },
  
  // Total Section
  totalSection: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: 200,
    paddingVertical: 5,
  },
  
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  totalAmount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  // Notes Section
  notesSection: {
    marginTop: 20,
  },
  
  notesTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  
  notesText: {
    fontSize: 10,
    color: '#666',
    lineHeight: 1.4,
  },
  
  // Footer
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    color: '#999',
  },
});

const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({ invoiceData, companyConfig }) => {
  const calculateTotal = () => {
    if (!invoiceData.items || invoiceData.items.length === 0) return 0;
    return invoiceData.items.reduce((sum, item) => sum + (item.amount || 0), 0);
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Logo data is now passed as prop

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{companyConfig.name}</Text>
            <Text style={styles.companyAddress}>{companyConfig.street}</Text>
            <Text style={styles.companyAddress}>
              {companyConfig.city}, {companyConfig.province} {companyConfig.postalCode}
            </Text>
            <Text style={styles.companyAddress}>{companyConfig.country}</Text>
            <Text style={styles.companyAddress}>Email: {companyConfig.email}</Text>
            <Text style={styles.companyAddress}>Phone: {companyConfig.phone}</Text>
            <Text style={styles.companyAddress}>Website: {companyConfig.website}</Text>
          </View>
          
          <View style={styles.rightSection}>
            {/* Company Logo - Try image with immediate fallback */}
            <View style={styles.logoFallback}>
              <Text style={styles.logoFallbackText}>GTC</Text>
            </View>
            
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            
            <Text style={styles.invoiceDetails}>Invoice #: {invoiceData.invoiceNumber}</Text>
            <Text style={styles.invoiceDetails}>Date: {formatDate(invoiceData.invoiceDate)}</Text>
            <Text style={styles.invoiceDetails}>Due Date: {formatDate(invoiceData.dueDate)}</Text>
          </View>
        </View>

        {/* Client Information */}
        <View style={styles.clientSection}>
          <Text style={styles.sectionTitle}>Bill To:</Text>
          <Text style={styles.clientInfo}>{invoiceData.clientName}</Text>
          <Text style={styles.clientInfo}>{invoiceData.clientEmail}</Text>
          {invoiceData.clientAddress && invoiceData.clientAddress.split('\n').map((line, index) => (
            <Text key={index} style={styles.clientInfo}>{line}</Text>
          ))}
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <View style={styles.col1}>
              <Text style={styles.tableHeaderText}>Description</Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.tableHeaderText}>Qty</Text>
            </View>
            <View style={styles.col3}>
              <Text style={styles.tableHeaderText}>Rate</Text>
            </View>
            <View style={styles.col4}>
              <Text style={styles.tableHeaderText}>Amount</Text>
            </View>
          </View>
          
          {/* Table Rows */}
          {invoiceData.items && invoiceData.items.length > 0 && invoiceData.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.col1}>
                <Text style={styles.tableCellText}>{item.description || ''}</Text>
              </View>
              <View style={styles.col2}>
                <Text style={styles.tableCellText}>{item.quantity || 0}</Text>
              </View>
              <View style={styles.col3}>
                <Text style={styles.tableCellText}>{formatCurrency(item.rate || 0)}</Text>
              </View>
              <View style={styles.col4}>
                <Text style={[styles.tableCellText, { fontWeight: 'bold' }]}>
                  {formatCurrency(item.amount || 0)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Total */}
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalAmount}>{formatCurrency(calculateTotal())}</Text>
          </View>
        </View>

        {/* Notes */}
        <View style={styles.notesSection}>
          <Text style={styles.notesTitle}>Notes:</Text>
          <Text style={styles.notesText}>{invoiceData.notes || ''}</Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>Thank you for your business!</Text>
      </Page>
    </Document>
  );
};

export default InvoiceTemplate;