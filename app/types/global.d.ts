/// <reference types="node" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL?: string;
      DB_HOST?: string;
      DB_PORT?: string;
      DB_USER?: string;
      DB_PASSWORD?: string;
      DB_NAME?: string;
      NODE_ENV: 'development' | 'production' | 'test';
      PORT?: string;
    }
  }
}

export {};