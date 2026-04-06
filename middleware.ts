import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { logger } from '@/lib/logger';

export function middleware(request: NextRequest) {
  const startTime = performance.now();
  const requestId = Math.random().toString(36).substring(7);

  // Створюємо відповідь
  const response = NextResponse.next();

  // Логуємо після завершення обробки запиту
  const duration = (performance.now() - startTime).toFixed(2);
  
  logger.info({
    requestId,
    method: request.method,
    url: request.nextUrl.pathname,
    status: response.status,
    duration: `${duration}ms`,
    userAgent: request.headers.get('user-agent'),
    ip: request.ip || '127.0.0.1',
  }, 'HTTP Request processed');

  return response;
}

export const config = {
  matcher: ['/api/:path*', '/stations/:path*'],
};