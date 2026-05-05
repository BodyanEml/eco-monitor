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
  

  return response;
}

export const config = {
  matcher: ['/api/:path*', '/stations/:path*'],
};