"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Components } from "@/lib/types";
import Image from "next/image";
import { InvoiceViewer } from "@/components/Invoice/InvoiceViewer";
import { TbFileInvoice } from "react-icons/tb";
import { useCurrency } from "@/hooks/useCurrency";

interface ComponentsGridWithInvoiceProps {
  components: Components[];
  loading: boolean;
  purchaseId: number;
  type: "component";
}

export function ComponentsGridWithInvoice({ components, loading, purchaseId, type }: ComponentsGridWithInvoiceProps) {
  const [showInvoice, setShowInvoice] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { formatPrice } = useCurrency();

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="animate-pulse">
            <div className="aspect-[4/3] bg-gray-200 dark:bg-[#ffffff08] rounded-lg"></div>
            <div className="mt-4 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-[#ffffff08] rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 dark:bg-[#ffffff08] rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!Array.isArray(components) || components.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        No components available
      </div>
    );
  }

  return (
    <div className="">
      {components.map((component) => (
        <div key={component.id}>
          <Link href={`/components/${component.name}`}>
            <div className="aspect-[4/3] overflow-hidden rounded-lg border bg-gray-100 transition-transform hover:scale-[1.02] group relative">
              <Image
                src={component.image}
                alt={component.name}
                width={100}
                height={100}
                loading="lazy"
                className={`w-full h-full object-cover object-center transition-all duration-500 ease-in-out ${
                  isLoading ? "blur-lg scale-105" : "blur-0 scale-100"
                }`}
                onLoadingComplete={() => setIsLoading(false)}
              />
              {/* Overlay Background */}
              <div className="absolute inset-0 bg-black/10 dark:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              {/* Overlay Button */}
              <button
                type="button"
                className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-md bg-white/30 dark:bg-gray-800/30 hover:bg-white/40 dark:hover:bg-gray-800/40 text-gray-900 dark:text-white shadow-lg w-12 h-12 flex items-center justify-center rounded-full"
                onClick={e => { e.preventDefault(); setShowInvoice(component.id); }}
              >
                <TbFileInvoice className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {component.name}
              </h3>
              <div className="mt-1 flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-zinc-400">
                  {component.price === 0 ? "Free" : formatPrice(component.price)}
                </span>
                <span className="text-gray-400">·</span>
                <span className="text-sm text-gray-600 dark:text-zinc-400">
                  {component.author}
                </span>
              </div>
            </div>
          </Link>

          {/* Modal */}
          {showInvoice === component.id && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 dark:bg-transparent dark:bg-[radial-gradient(transparent_1px,_#000_1px)] dark:bg-[length:4px_4px] dark:backdrop-brightness-100 dark:backdrop-blur-lg  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
              <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-800 w-full max-w-md sm:max-w-lg mx-2 p-0 sm:p-0 relative overflow-y-auto max-h-[90vh] flex flex-col">
                <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
                  <InvoiceViewer purchaseId={purchaseId} type={type} />
                </div>
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-900 dark:hover:text-white text-2xl font-bold bg-white dark:bg-gray-900 rounded-full w-8 h-8 flex items-center justify-center shadow-md border border-gray-200 dark:border-zinc-800"
                  onClick={() => setShowInvoice(null)}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 