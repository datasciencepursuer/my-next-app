import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getCompanyConfig } from '@/lib/company';
import jsPDF from 'jspdf';
import { DEFAULT_INVOICE_NOTES } from '@/shared/constants/invoice';

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

async function loadImageAsBase64(url: string): Promise<{ base64: string; contentType: string }> {
  try {
    console.log('Loading image from:', url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    console.log('Image loaded successfully, content-type:', contentType, 'base64 length:', base64.length);
    return { base64, contentType };
  } catch (error) {
    console.error('Failed to load image:', error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log('Starting invoice generation with jsPDF...');
    
    if (!isAuthenticated(req)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const invoiceData: InvoiceData = await req.json();
    const config = getCompanyConfig();
    
    // Load company logo
    const logoUrl = 'https://o6so15s6oe.ufs.sh/f/IF7FvZlZ7vKmI9HeLbDlZ7vKmQRMkr3lHeyLDOGX1njxAzVW';
    let logoData: { base64: string; contentType: string } | null = null;
    
    try {
      logoData = await loadImageAsBase64(logoUrl);
    } catch (error) {
      console.log('Failed to load logo, continuing without it:', error);
    }
    
    // Create new PDF document
    const doc = new jsPDF();
    
    // Add company logo if loaded
    if (logoData) {
      try {
        // Determine format from content type
        let format = 'JPEG'; // default
        let mimeType = logoData.contentType;
        
        if (logoData.contentType.includes('png')) {
          format = 'PNG';
        } else if (logoData.contentType.includes('jpeg') || logoData.contentType.includes('jpg')) {
          format = 'JPEG';
        } else if (logoData.contentType.includes('gif')) {
          format = 'GIF';
        } else if (logoData.contentType.includes('svg')) {
          // For SVG, try as PNG first, then JPEG
          format = 'PNG';
          mimeType = 'image/png';
        }
        
        console.log('Attempting to add image with format:', format, 'mime:', mimeType);
        
        // Try with detected format first
        try {
          doc.addImage(`data:${mimeType};base64,${logoData.base64}`, format, 140, 10, 50, 20);
          console.log('Logo added to PDF successfully with format:', format);
        } catch {
          console.log('Failed with detected format, trying JPEG fallback');
          // Fallback to JPEG
          doc.addImage(`data:image/jpeg;base64,${logoData.base64}`, 'JPEG', 140, 10, 50, 20);
          console.log('Logo added to PDF successfully with JPEG fallback');
        }
      } catch (error) {
        console.log('Failed to add logo to PDF:', error);
        // Fallback to text logo
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 100, 200);
        doc.text('GTC', 140, 25);
      }
    } else {
      // Fallback to text logo
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 100, 200);
      doc.text('GTC', 150, 25);
    }
    
    // Company Information
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0); // Black for company name
    doc.text(config.name, 20, 20);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60); // Dark gray for address
    doc.text(config.address.street, 20, 30);
    doc.text(`${config.address.city}, ${config.address.province} ${config.address.postalCode}`, 20, 35);
    doc.text(config.address.country, 20, 40);
    
    // Email with gray label and blue value
    doc.setTextColor(60, 60, 60); // Gray for label
    doc.text('Email: ', 20, 50);
    doc.setTextColor(59, 130, 246); // Blue for email address
    doc.text(config.contact.email, 35, 50);
    
    // Phone back to gray
    doc.setTextColor(60, 60, 60);
    doc.text(`Phone: ${config.contact.phone}`, 20, 55);
    
    // Website with gray label and blue value
    doc.setTextColor(60, 60, 60); // Gray for label
    doc.text('Website: ', 20, 60);
    doc.setTextColor(59, 130, 246); // Blue for website URL
    doc.text(config.contact.website, 40, 60);
    
    // Invoice Title and Details
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0); // Black for INVOICE title
    doc.text('INVOICE', 140, 40);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0); // Black for invoice details
    doc.text(`Invoice #: ${invoiceData.invoiceNumber}`, 140, 50);
    
    // Format dates
    const formatDate = (dateString: string) => {
      const date = new Date(dateString + 'T00:00:00');
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    };
    
    doc.text(`Date: ${formatDate(invoiceData.invoiceDate)}`, 140, 55);
    doc.text(`Due Date: ${formatDate(invoiceData.dueDate)}`, 140, 60);
    
    // Client Information
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(79, 70, 229); // Indigo-600 for section headers
    doc.text('Bill To:', 20, 80);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0); // Black for client info
    doc.text(invoiceData.clientName, 20, 90);
    doc.text(invoiceData.clientEmail, 20, 95);
    
    // Handle multi-line address
    const addressLines = invoiceData.clientAddress.split('\n');
    let yPos = 100;
    addressLines.forEach(line => {
      doc.text(line, 20, yPos);
      yPos += 5;
    });
    
    // Items Table Header
    const tableStartY = yPos + 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    
    // Table headers
    doc.text('Description', 20, tableStartY);
    doc.text('Qty', 120, tableStartY);
    doc.text('Rate', 140, tableStartY);
    doc.text('Amount', 170, tableStartY);
    
    // Draw header line
    doc.line(20, tableStartY + 2, 190, tableStartY + 2);
    
    // Items
    doc.setFont('helvetica', 'normal');
    let currentY = tableStartY + 10;
    let total = 0;
    
    invoiceData.items.forEach((item) => {
      doc.text(item.description, 20, currentY);
      doc.text(item.quantity.toString(), 120, currentY);
      doc.text(`$${item.rate.toFixed(2)}`, 140, currentY);
      doc.text(`$${item.amount.toFixed(2)}`, 170, currentY);
      total += item.amount;
      currentY += 8;
    });
    
    // Total
    doc.line(20, currentY, 190, currentY);
    currentY += 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0); // Black for total label
    doc.text('Total:', 140, currentY);
    doc.setTextColor(0, 0, 0); // Black for total amount
    doc.text(`$${total.toFixed(2)}`, 170, currentY);
    
    // Notes
    currentY += 20;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(79, 70, 229); // Indigo-600 for section headers
    doc.text('Notes:', 20, currentY);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60); // Dark gray for notes text
    const notesText = invoiceData.notes?.trim() || DEFAULT_INVOICE_NOTES;
    
    // Split notes into lines
    const splitNotes = doc.splitTextToSize(notesText, 170);
    doc.text(splitNotes, 20, currentY + 10);
    
    // Footer
    doc.setFontSize(9);
    doc.text('Thank you for your business!', 105, 280, { align: 'center' });
    
    // Generate PDF buffer
    const pdfBuffer = doc.output('arraybuffer');
    console.log('PDF generated successfully with jsPDF, size:', pdfBuffer.byteLength);
    
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="invoice-${invoiceData.invoiceNumber}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Invoice generation error:', error);
    return NextResponse.json({ message: 'Failed to generate invoice' }, { status: 500 });
  }
}