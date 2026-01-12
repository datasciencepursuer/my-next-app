'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/presentation/components/ui/Button';
import { DEFAULT_INVOICE_NOTES } from '@/shared/constants/invoice';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface InvoiceFormData {
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  invoiceNumber: string;
  invoiceSequence: string;
  invoiceDate: string;
  dueDate: string;
  items: InvoiceItem[];
  notes: string;
}

export default function InvoicesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const router = useRouter();
  
  // Generate date prefix for invoice number in format YYYYMMDD
  const generateDatePrefix = (date?: string) => {
    const targetDate = date ? new Date(date + 'T00:00:00') : new Date();
    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const day = String(targetDate.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  // Generate full invoice number
  const generateFullInvoiceNumber = (date: string, sequence: string) => {
    return `${generateDatePrefix(date)}-${sequence}`;
  };

  const today = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState<InvoiceFormData>({
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    invoiceNumber: generateFullInvoiceNumber(today, '001'),
    invoiceSequence: '001',
    invoiceDate: today,
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    items: [{ id: '1', description: '', quantity: 1, rate: 0, amount: 0 }],
    notes: DEFAULT_INVOICE_NOTES
  });

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/verify', {
        credentials: 'include',
      });
      
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        router.push('/admin/login');
      }
    } catch {
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    };
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          if (field === 'quantity' || field === 'rate') {
            updated.amount = updated.quantity * updated.rate;
          }
          return updated;
        }
        return item;
      })
    }));
  };

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => total + item.amount, 0);
  };

  const generateInvoice = async () => {
    setGenerating(true);
    try {
      const response = await fetch('/api/admin/generate-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${formData.clientName.replace(/[^a-zA-Z0-9]/g, '_')}_invoice-${formData.invoiceNumber}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        alert('Failed to generate invoice');
      }
    } catch (error) {
      console.error('Error generating invoice:', error);
      alert('Error generating invoice');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="relative min-h-screen">
      {/* Hero Banner Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://o6so15s6oe.ufs.sh/f/IF7FvZlZ7vKmXQ7Ln51Ol0SVZyrj5JsoTuE2GBDW1kHNF9gc"
          alt="Invoice generator background"
          fill
          className="object-cover select-none pointer-events-none"
          priority
          sizes="100vw"
          quality={85}
          draggable={false}
          unselectable="on"
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <main className="relative z-10 max-w-4xl mx-auto pt-24 pb-8 px-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-lg p-6 w-full max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <Button href="/admin/dashboard" className="bg-white/20 hover:bg-white/30 border border-white/30 hover:border-white/50 backdrop-blur-sm">
                <span className="text-white">← Back to Dashboard</span>
              </Button>
              <h2 className="text-2xl font-bold text-white">Invoice Generator</h2>
            </div>
            <Button
              onClick={generateInvoice}
              disabled={generating}
              className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 hover:border-blue-400/50 backdrop-blur-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-white">
                {generating ? 'Generating...' : 'Generate PDF Invoice'}
              </span>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Client Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80">Client Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-md px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
                    value={formData.clientName}
                    onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80">Client Email</label>
                  <input
                    type="email"
                    className="mt-1 block w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-md px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80">Client Address</label>
                  <textarea
                    className="mt-1 block w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-md px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
                    rows={3}
                    value={formData.clientAddress}
                    onChange={(e) => setFormData(prev => ({ ...prev, clientAddress: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-4">Invoice Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80">Invoice Number</label>
                  <div className="mt-1 flex items-center space-x-1">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-md px-3 py-2 text-white/80 text-sm">
                      {generateDatePrefix(formData.invoiceDate)}
                    </div>
                    <span className="text-white/80">-</span>
                    <input
                      type="text"
                      className="w-20 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 text-center"
                      value={formData.invoiceSequence}
                      onChange={(e) => {
                        const digitsOnly = e.target.value.replace(/[^0-9]/g, '');
                        const sequence = digitsOnly.slice(-3).padStart(3, '0');
                        setFormData(prev => ({
                          ...prev,
                          invoiceSequence: sequence,
                          invoiceNumber: generateFullInvoiceNumber(prev.invoiceDate, sequence)
                        }));
                      }}
                      placeholder="001"
                      maxLength={3}
                    />
                  </div>
                  <p className="text-xs text-white/60 mt-1">Date prefix auto-updates, sequence number is editable</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80">Invoice Date</label>
                  <input
                    type="date"
                    className="mt-1 block w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-md px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
                    value={formData.invoiceDate}
                    onChange={(e) => {
                      const newDate = e.target.value;
                      setFormData(prev => ({ 
                        ...prev, 
                        invoiceDate: newDate,
                        invoiceNumber: generateFullInvoiceNumber(newDate, prev.invoiceSequence)
                      }));
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80">Due Date</label>
                  <input
                    type="date"
                    className="mt-1 block w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-md px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
                    value={formData.dueDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Invoice Items</h3>
              <Button onClick={addItem} className="bg-green-500/20 hover:bg-green-500/30 border border-green-400/30 hover:border-green-400/50 backdrop-blur-sm cursor-pointer">
                <span className="text-white">Add Item</span>
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/20">
                <thead className="bg-white/10 backdrop-blur-sm">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Qty</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white/5 backdrop-blur-sm divide-y divide-white/10">
                  {formData.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          placeholder="Item description"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          min="1"
                          className="w-20 bg-white/20 backdrop-blur-sm border border-white/30 rounded px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
                          value={item.quantity}
                          onFocus={(e) => {
                            if (item.quantity === 1) {
                              e.target.select();
                            }
                          }}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === '') {
                              updateItem(item.id, 'quantity', 1);
                            } else {
                              updateItem(item.id, 'quantity', parseInt(value) || 1);
                            }
                          }}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-24 bg-white/20 backdrop-blur-sm border border-white/30 rounded px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
                          value={item.rate}
                          onFocus={(e) => {
                            if (item.rate === 0) {
                              e.target.select();
                            }
                          }}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === '') {
                              updateItem(item.id, 'rate', 0);
                            } else {
                              updateItem(item.id, 'rate', parseFloat(value) || 0);
                            }
                          }}
                        />
                      </td>
                      <td className="px-6 py-4 text-white font-medium">
                        ${item.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        {formData.items.length > 1 && (
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-300 hover:text-red-100 cursor-pointer"
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 text-right">
              <div className="text-lg font-medium text-white">
                Total: ${calculateTotal().toFixed(2)}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-white/80 mb-2">Notes</label>
            <textarea
              className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-md px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Additional notes or terms..."
            />
          </div>

        </div>
      </main>
    </div>
  );
}