export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ACTIVE = 'ACTIVE',
  ERROR = 'ERROR'
}

export interface RetroConfig {
  highContrast: boolean;
  scanlines: boolean;
}