import { useState, useEffect } from 'react';

interface RazorpayHookResult {
  isLoaded: boolean;
  isLoading: boolean;
  error: Error | null;
  loadScript: () => Promise<void>;
}

export const useRazorpay = (): RazorpayHookResult => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadScript = async () => {
    if (typeof window === 'undefined' || window.Razorpay) return;

    try {
      setIsLoading(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.dataset.priority = 'high';

      return new Promise<void>((resolve, reject) => {
        script.onload = () => {
          setIsLoaded(true);
          setIsLoading(false);
          resolve();
        };

        script.onerror = () => {
          const scriptError = new Error('Failed to load Razorpay SDK');
          setError(scriptError);
          setIsLoading(false);
          reject(scriptError);
        };

        document.body.appendChild(script);
      });
    } catch (err) {
      const processedError = err instanceof Error
        ? err
        : new Error('Unknown Razorpay script loading error');

      setError(processedError);
      setIsLoading(false);
      throw processedError;
    }
  };

  useEffect(() => {
    loadScript();

    return () => {
      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return { isLoaded, isLoading, error, loadScript };
};