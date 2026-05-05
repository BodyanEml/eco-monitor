// lib/logger.ts
import pino from 'pino';

const isDevelopment = process.env.NODE_ENV === 'development';
const isServer = typeof window === 'undefined';

export const logger = isServer 
  ? pino({
      level: process.env.LOG_LEVEL || 'info',
      // Використовуємо простіший формат часу для консолі
      timestamp: () => `,"time":"${new Date().toLocaleString('uk-UA')}"`,
      transport: isDevelopment ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: false, 
          ignore: 'pid,hostname',
          
          singleLine: false 
        }
      } : undefined,
    })
  : {
      info: console.log,
      error: console.error,
      warn: console.warn,
      debug: console.log,
    };