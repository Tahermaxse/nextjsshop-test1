"use client";

import { useCurrency } from "@/hooks/useCurrency";
import { Button } from "@/components/ui/button";

export function CurrencyDebugger() {
  const { 
    currency, 
    symbol, 
    conversionRate, 
    isLoading, 
    formatPrice, 
    setCurrency, 
    refreshCurrency,
    clearStoredCurrency
  } = useCurrency();

  const testPrice = 29.99; // Example price

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-lg border max-w-sm z-50">
      <h3 className="font-semibold mb-2">Currency Debugger</h3>
      
      <div className="space-y-2 text-sm">
        <div>
          <strong>Current Currency:</strong> {currency} {symbol}
        </div>
        <div>
          <strong>Conversion Rate:</strong> {conversionRate}
        </div>
        <div>
          <strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>Test Price:</strong> ${testPrice} → {formatPrice(testPrice)}
        </div>
      </div>

      <div className="flex gap-2 mt-3 flex-wrap">
        <Button 
          size="sm" 
          onClick={() => setCurrency('INR')}
          variant="outline"
        >
          Force INR
        </Button>
        <Button 
          size="sm" 
          onClick={() => setCurrency('USD')}
          variant="outline"
        >
          Force USD
        </Button>
        <Button 
          size="sm" 
          onClick={refreshCurrency}
          variant="outline"
        >
          Refresh
        </Button>
        <Button 
          size="sm" 
          onClick={clearStoredCurrency}
          variant="outline"
        >
          Clear Stored
        </Button>
      </div>

      <div className="mt-2 text-xs text-gray-500">
        Check console for detailed logs
      </div>
    </div>
  );
}
