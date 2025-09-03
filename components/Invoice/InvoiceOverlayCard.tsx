import { useState } from "react";
import { InvoiceViewer } from "@/components/Invoice/InvoiceViewer";

interface InvoiceOverlayCardProps {
  card: React.ReactNode;
  purchaseId: number;
  type: "template" | "component";
}

export function InvoiceOverlayCard({ card, purchaseId, type }: InvoiceOverlayCardProps) {
  const [showInvoice, setShowInvoice] = useState(false);

  return (
    <div className="relative group">
      {card}
      <button
        className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-gray-900 dark:text-white shadow-lg px-4 py-2 rounded"
        onClick={() => setShowInvoice(true)}
      >
        View Invoice
      </button>
      {showInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setShowInvoice(false)}
            >
              ×
            </button>
            <InvoiceViewer purchaseId={purchaseId} type={type} />
          </div>
        </div>
      )}
    </div>
  );
} 