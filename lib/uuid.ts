import { randomUUID } from 'crypto';

/**
 * Generate a secure UUID for database records
 * Uses Node.js crypto.randomUUID() for better security than uuid package
 */
export function generateSecureUUID(): string {
  return randomUUID();
}

/**
 * Validate if a string is a valid UUID format
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Generate a short, URL-friendly ID (for public URLs)
 * This is different from the database UUID and is used for public-facing URLs
 */
export function generatePublicId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
