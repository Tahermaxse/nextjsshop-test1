import { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { useCurrency } from "@/hooks/useCurrency";

interface InvoiceViewerProps {
  purchaseId: number;
  type: "template" | "component";
}

interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  paymentDate: string;
  paymentMethod: string;
  paymentId: string;
  orderId: string;
  amount: number; // This is in USD
  currency: string; // Add currency field
  status: string;
  item: {
    name: string;
    price: number; // This is in USD
    description?: string;
  };
  customer: {
    name: string;
    email: string;
  };
  seller: {
    name: string;
    email: string;
    address: string;
    taxId: string;
  };
}

export function InvoiceViewer({ purchaseId, type }: InvoiceViewerProps) {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const { formatPrice, currency, symbol, convertPrice } = useCurrency();

  // Helper function to format price based on whether it's already converted or not
  const formatInvoicePrice = (amount: number, isAlreadyConverted: boolean = false) => {
    if (isAlreadyConverted) {
      // If amount is already in local currency, just format with symbol
      return `${symbol}${amount}`;
    } else {
      // If amount is in USD, use formatPrice to convert
      return formatPrice(amount);
    }
  };
  
  const fetchInvoice = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ purchaseId, type }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch invoice");
      }

      const data = await response.json();
      setInvoiceData(data);
    } catch (error) {
      console.error("Error fetching invoice:", error);
      toast.error("Failed to fetch invoice");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: `Invoice-${invoiceData?.invoiceNumber}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
        }
        .no-print {
          display: none;
        }
      }
    `,
  });

  if (!invoiceData) {
    return (
      <Button 
        onClick={fetchInvoice} 
        disabled={loading}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 from-green-600 to-green-500 text-white bg-gradient-to-t border border-b-2 border-green-900/40 shadow-md shadow-green-900/20 ring-1 ring-inset ring-white/25 transition-[filter] duration-200 hover:brightness-110 active:brightness-90 dark:shadow-[inset_0_1px_3px_0_rgba(255,255,255,0.1)]"
      >
        {loading ? "Loading..." : "View Invoice"}
      </Button>
    );
  }

  return (
    <div className="space-y-4">
      <div
        ref={invoiceRef}
        className="bg-white text-gray-900 rounded-xl shadow-lg border border-gray-200 max-w-[700px] mx-auto p-0 print:p-0"
        style={{ fontFamily: 'Inter, Arial, sans-serif', fontSize: '16px' }}
      >
        {/* Header with Logo and Company Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-8 pt-8 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <img src="/images/logo.svg" alt="Nextjsshop Logo" className="h-12 w-auto" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Invoice</h1>
              <span className="text-xs text-gray-400 font-mono">#{invoiceData.invoiceNumber}</span>
            </div>
          </div>
          <div className="text-right w-full sm:w-auto">
            <div className="font-semibold text-lg">{invoiceData.seller.name}</div>
            <div className="text-xs text-gray-500">{invoiceData.seller.address}</div>
            <div className="text-xs text-gray-500">Tax ID: {invoiceData.seller.taxId}</div>
          </div>
        </div>

        {/* Bill To & Invoice Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-8 py-6 border-b border-gray-100">
          <div>
            <div className="font-semibold mb-1 text-gray-700">Bill To:</div>
            <div className="font-medium">{invoiceData.customer.name}</div>
            <div className="text-xs text-gray-500">{invoiceData.customer.email}</div>
          </div>
          <div className="sm:text-right">
            <div className="text-xs text-gray-500 mb-1">
              <span className="font-semibold text-gray-700">Invoice Date:</span> {invoiceData.invoiceDate}
            </div>
            <div className="text-xs text-gray-500 mb-1">
              <span className="font-semibold text-gray-700">Payment Date:</span> {invoiceData.paymentDate}
            </div>
            <div className="text-xs text-gray-500 mb-1">
              <span className="font-semibold text-gray-700">Status:</span> <span className={`inline-block px-2 py-0.5 rounded font-semibold text-xs ${invoiceData.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{invoiceData.status}</span>
            </div>
            <div className="text-xs text-gray-500 mb-1">
              <span className="font-semibold text-gray-700">Currency:</span> {currency} {symbol}
            </div>
          </div>
        </div>

        {/* Item Table */}
        <div className="px-8 py-6">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="py-2 px-2 font-semibold text-gray-700 text-sm">Item</th>
                  <th className="py-2 px-2 font-semibold text-gray-700 text-sm text-right">Price</th>
                  <th className="py-2 px-2 font-semibold text-gray-700 text-sm text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b last:border-b-0">
                  <td className="py-3 px-2 align-top">
                    <div className="font-medium">{invoiceData.item.name}</div>
                    {invoiceData.item.description && (
                      <div className="text-xs text-gray-500 mt-1">{invoiceData.item.description}</div>
                    )}
                  </td>
                  <td className="py-3 px-2 text-right align-top">
                    {formatInvoicePrice(invoiceData.item.price, invoiceData.currency === currency)}
                  </td>
                  <td className="py-3 px-2 text-right align-top">
                    {formatInvoicePrice(invoiceData.amount, invoiceData.currency === currency)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Total & Payment Info */}
        <div className="px-8 pb-8 flex flex-col items-end gap-2 border-t border-gray-100">
          <div className="text-xl font-bold text-green-700 mt-4">
            Total: {formatInvoicePrice(invoiceData.amount, invoiceData.currency === currency)}
          </div>
          <div className="text-xs text-gray-500">Payment Method: {invoiceData.paymentMethod}</div>
          <div className="text-xs text-gray-500">Payment ID: {invoiceData.paymentId}</div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-gray-100 text-center text-xs text-gray-400 rounded-b-xl">
          <div>Thank you for your purchase!</div>
          <div>For any queries, contact <span className="underline">{invoiceData.seller.email}</span></div>
        </div>
      </div>

      <div className="flex justify-end gap-4 no-print">
        <Button onClick={() => handlePrint()} variant="outline">
          Download PDF
        </Button>
        <Button onClick={() => setInvoiceData(null)} variant="outline">
          Close
        </Button>
      </div>
    </div>
  );
}