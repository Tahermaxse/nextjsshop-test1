import crypto from 'crypto';

// Generate a CSRF token
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Validate a CSRF token
export function validateCSRFToken(token: string, storedToken: string): boolean {
  if (!token || !storedToken) {
    return false;
  }
  
  // Simple string comparison for now - in production, consider using a more secure method
  return token === storedToken;
}

// Get CSRF token from request headers
export function getCSRFTokenFromHeaders(headers: Headers | Record<string, any>): string | null {
  if (headers instanceof Headers) {
    // Standard Headers object
    return headers.get('x-csrf-token') || headers.get('csrf-token');
  } else {
    // Plain object (like NextAuth provides)
    return headers['x-csrf-token'] || headers['csrf-token'] || null;
  }
}

// Get CSRF token from request body
export function getCSRFTokenFromBody(body: any): string | null {
  return body?.csrfToken || body?._csrf;
}
