import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// In-memory rate limit store as fallback
const memoryStore = new Map<string, { count: number; reset: number }>();

// Create a new ratelimiter that allows 10 requests per 10 seconds
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
  prefix: 'ratelimit',
});

// Create a stricter ratelimiter for sensitive operations (5 requests per minute)
export const strictRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 m'),
  analytics: true,
  prefix: 'strict_ratelimit',
});

// Create a very strict ratelimiter for critical operations (3 requests per hour)
export const criticalRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '1 h'),
  analytics: true,
  prefix: 'critical_ratelimit',
});

// Helper function to get IP from request
export function getIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0];
  }
  return request.headers.get('x-real-ip') || '127.0.0.1';
}

// Helper function to handle rate limit response
export function rateLimitResponse(ip: string, limit: number, remaining: number, reset: number) {
  return new Response(JSON.stringify({
    error: 'Too many requests',
    limit,
    remaining,
    reset,
  }), {
    status: 429,
    headers: {
      'Content-Type': 'application/json',
      'X-RateLimit-Limit': limit.toString(),
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': reset.toString(),
    },
  });
}

// Wrapper function to handle Redis connection failures
export async function safeRateLimit(ratelimiter: Ratelimit, ip: string) {
  try {
    return await ratelimiter.limit(ip);
  } catch (error) {
    console.error('Redis rate limit error:', error);
    
    // Fallback to in-memory rate limiting
    const now = Date.now();
    const key = `memory_ratelimit:${ip}`;
    const stored = memoryStore.get(key);
    
    if (!stored || now > stored.reset) {
      // First request or reset period passed
      memoryStore.set(key, { count: 1, reset: now + 10000 }); // 10 seconds
      return { success: true, limit: 10, remaining: 9, reset: now + 10000 };
    }
    
    if (stored.count >= 10) {
      return { success: false, limit: 10, remaining: 0, reset: stored.reset };
    }
    
    stored.count++;
    memoryStore.set(key, stored);
    return { success: true, limit: 10, remaining: 10 - stored.count, reset: stored.reset };
  }
} 