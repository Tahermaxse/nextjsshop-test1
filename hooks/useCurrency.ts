import { useState, useEffect } from 'react';

interface CurrencyInfo {
  currency: 'INR' | 'USD';
  symbol: '₹' | '$';
  conversionRate: number;
  isLoading: boolean;
}

const CURRENCY_STORAGE_KEY = 'user-preferred-currency';

// Development override - set to true to force INR for testing
const FORCE_INR_DEV_MODE = false;

// Simple error boundary for the hook
const createSafeCurrencyHook = () => {
  try {
    return () => {
      const [currencyInfo, setCurrencyInfo] = useState<CurrencyInfo>(() => {
        // Development override - force INR for testing
        if (FORCE_INR_DEV_MODE && typeof window !== 'undefined') {
          console.log('DEV MODE: Forcing INR for testing');
          return {
            currency: 'INR' as const,
            symbol: '₹' as const,
            conversionRate: 83,
            isLoading: false
          };
        }
        
        // Try to get from localStorage first for immediate response
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem(CURRENCY_STORAGE_KEY);
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              // console.log('Loaded stored currency:', parsed);
              // Even if we have stored currency, we'll still run detection to update it
              return {
                ...parsed,
                isLoading: true // Set to true so detection runs
              };
            } catch (e) {
              console.warn('Failed to parse stored currency, using default');
            }
          }
          
          // Quick fallback based on browser language for immediate display
          const language = navigator.language || 'en-US';
          // console.log('Browser language detected:', language);
          
          // More comprehensive Indian detection
          if (language.includes('IN') || language === 'hi' || language === 'hi-IN' || language === 'en-IN') {
            // console.log('Indian language detected, setting INR immediately');
            return {
              currency: 'INR' as const,
              symbol: '₹' as const,
              conversionRate: 83,
              isLoading: false
            };
          }
          
          // Additional check: Timezone-based detection
          try {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            // console.log('Timezone detected:', timezone);
            
            // Indian timezones
            if (timezone.includes('Asia/Kolkata') || timezone.includes('Asia/Calcutta')) {
              // console.log('Indian timezone detected, setting INR immediately');
              return {
                currency: 'INR' as const,
                symbol: '₹' as const,
                conversionRate: 83,
                isLoading: false
              };
            }
          } catch (tzError) {
            console.warn('Timezone detection failed:', tzError);
          }
        }
        
        // console.log('No stored currency or Indian language, defaulting to USD');
        return {
          currency: 'USD',
          symbol: '$',
          conversionRate: 1,
          isLoading: true
        };
      });

      useEffect(() => {
        const detectCurrency = async () => {
          // console.log('Starting currency detection...');
          
          try {
            // Method 1: Try to get user's location via IP with timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
            
            try {
              // console.log('Attempting IP geolocation...');
              const response = await fetch('https://ipapi.co/json/', {
                signal: controller.signal,
                headers: {
                  'Accept': 'application/json',
                }
              });
              clearTimeout(timeoutId);
              
              if (response.ok) {
                const data = await response.json();
                // console.log('IP geolocation response:', data);
                
                if (data.country_code === 'IN') {
                  // console.log('Indian IP detected, setting INR');
                  // User is in India, show INR
                  const conversionRate = await getUSDToINRRate();
                  const newCurrencyInfo = {
                    currency: 'INR' as const,
                    symbol: '₹' as const,
                    conversionRate,
                    isLoading: false
                  };
                  setCurrencyInfo(newCurrencyInfo);
                  // Store in localStorage
                  if (typeof window !== 'undefined') {
                    localStorage.setItem(CURRENCY_STORAGE_KEY, JSON.stringify(newCurrencyInfo));
                  }
                  return;
                } else {
                  // console.log('Non-Indian IP detected:', data.country_code);
                }
              }
            } catch (ipError) {
              console.warn('IP geolocation failed, trying browser language fallback:', ipError);
            }

            // Method 2: Fallback to browser's navigator.language
            const language = navigator.language || 'en-US';
            // console.log('Checking browser language:', language);
            
            // More comprehensive Indian detection
            if (language.includes('IN') || language === 'hi' || language === 'hi-IN' || language === 'en-IN') {
              // console.log('Indian language detected in fallback, setting INR');
              const conversionRate = await getUSDToINRRate();
              const newCurrencyInfo = {
                currency: 'INR' as const,
                symbol: '₹' as const,
                conversionRate,
                isLoading: false
              };
              setCurrencyInfo(newCurrencyInfo);
              // Store in localStorage
              if (typeof window !== 'undefined') {
                localStorage.setItem(CURRENCY_STORAGE_KEY, JSON.stringify(newCurrencyInfo));
              }
            } else {
              // console.log('Non-Indian language detected, setting USD');
              const newCurrencyInfo = {
                currency: 'USD' as const,
                symbol: '$' as const,
                conversionRate: 1,
                isLoading: false
              };
              setCurrencyInfo(newCurrencyInfo);
              // Store in localStorage
              if (typeof window !== 'undefined') {
                localStorage.setItem(CURRENCY_STORAGE_KEY, JSON.stringify(newCurrencyInfo));
              }
            }
          } catch (error) {
            console.warn('Currency detection failed, using USD as fallback:', error);
            // Final fallback: Use USD
            const fallbackCurrencyInfo = {
              currency: 'USD' as const,
              symbol: '$' as const,
              conversionRate: 1,
              isLoading: false
            };
            setCurrencyInfo(fallbackCurrencyInfo);
            // Store in localStorage
            if (typeof window !== 'undefined') {
              localStorage.setItem(CURRENCY_STORAGE_KEY, JSON.stringify(fallbackCurrencyInfo));
            }
          }
        };

        // Only run detection if we don't have stored currency or if we're still loading
        if (currencyInfo.isLoading) {
          // console.log('Currency is loading, running detection...');
          // Use a try-catch wrapper to prevent any errors from breaking the component
          detectCurrency().catch((error) => {
            console.error('Unexpected error in currency detection:', error);
            // Ensure we always have a valid state
            const fallbackCurrencyInfo = {
              currency: 'USD' as const,
              symbol: '$' as const,
              conversionRate: 1,
              isLoading: false
            };
            setCurrencyInfo(fallbackCurrencyInfo);
            if (typeof window !== 'undefined') {
              localStorage.setItem(CURRENCY_STORAGE_KEY, JSON.stringify(fallbackCurrencyInfo));
            }
          });
        } else {
          // console.log('Currency already loaded, skipping detection');
        }
      }, [currencyInfo.isLoading]);

      const getUSDToINRRate = async (): Promise<number> => {
        try {
          // console.log('Fetching USD to INR conversion rate...');
          // Try multiple APIs for better reliability with timeouts
          const apis = [
            'https://api.exchangerate-api.com/v4/latest/USD',
            'https://api.exchangerate.host/latest?base=USD&symbols=INR',
            'https://open.er-api.com/v6/latest/USD'
          ];

          for (const api of apis) {
            try {
              // console.log(`Trying API: ${api}`);
              const controller = new AbortController();
              const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout per API
              
              const response = await fetch(api, { signal: controller.signal });
              clearTimeout(timeoutId);
              
              if (response.ok) {
                const data = await response.json();
                // console.log(`API response from ${api}:`, data);
                
                if (data.rates?.INR) {
                  // console.log(`Successfully got rate from ${api}:`, data.rates.INR);
                  return data.rates.INR;
                } else if (data.conversion_rates?.INR) {
                  // console.log(`Successfully got rate from ${api}:`, data.conversion_rates.INR);
                  return data.conversion_rates.INR;
                }
              }
            } catch (apiError) {
              console.warn(`API ${api} failed:`, apiError);
              continue;
            }
          }
          
          // console.log('All APIs failed, using fallback rate of 83');
          // Fallback to approximate rate if all APIs fail
          return 83;
        } catch (error) {
          console.warn('Error fetching conversion rate, using fallback:', error);
          return 83; // Fallback conversion rate
        }
      };

      const convertPrice = (usdPrice: number): number => {
        return Math.round(usdPrice * currencyInfo.conversionRate);
      };

      const formatPrice = (usdPrice: number): string => {
        const convertedPrice = convertPrice(usdPrice);
        return `${currencyInfo.symbol}${convertedPrice}`;
      };

      const getCurrencyCode = (): string => {
        return currencyInfo.currency;
      };

      // Function to manually set currency (useful for testing or user preference)
      const setCurrency = (currency: 'INR' | 'USD') => {
        // console.log(`Manually setting currency to: ${currency}`);
        const newCurrencyInfo: CurrencyInfo = {
          currency,
          symbol: currency === 'INR' ? '₹' : '$',
          conversionRate: currency === 'INR' ? 83 : 1,
          isLoading: false
        };
        setCurrencyInfo(newCurrencyInfo);
        if (typeof window !== 'undefined') {
          localStorage.setItem(CURRENCY_STORAGE_KEY, JSON.stringify(newCurrencyInfo));
        }
      };

      // Function to force refresh currency detection (useful for debugging)
      const refreshCurrency = () => {
        // console.log('Forcing currency refresh...');
        // Clear localStorage and restart detection
        if (typeof window !== 'undefined') {
          localStorage.removeItem(CURRENCY_STORAGE_KEY);
        }
        setCurrencyInfo({
          currency: 'USD',
          symbol: '$',
          conversionRate: 1,
          isLoading: true
        });
      };

      // Function to clear stored currency and force fresh detection
      const clearStoredCurrency = () => {
        // console.log('Clearing stored currency...');
        if (typeof window !== 'undefined') {
          localStorage.removeItem(CURRENCY_STORAGE_KEY);
        }
        // Force a fresh detection
        setCurrencyInfo({
          currency: 'USD',
          symbol: '$',
          conversionRate: 1,
          isLoading: true
        });
      };

      return {
        ...currencyInfo,
        convertPrice,
        formatPrice,
        getCurrencyCode,
        setCurrency,
        refreshCurrency,
        clearStoredCurrency
      };
    };
  } catch (error) {
    console.error('Failed to create currency hook, using fallback:', error);
    // Return a completely safe fallback hook
    return () => ({
      currency: 'USD' as const,
      symbol: '$' as const,
      conversionRate: 1,
      isLoading: false,
      convertPrice: (usdPrice: number) => usdPrice,
      formatPrice: (usdPrice: number) => `$${usdPrice}`,
      getCurrencyCode: () => 'USD',
      setCurrency: () => {},
      refreshCurrency: () => {},
      clearStoredCurrency: () => {}
    });
  }
};

export const useCurrency = createSafeCurrencyHook();