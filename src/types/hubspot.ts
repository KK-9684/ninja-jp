// HubSpot Forms の型定義
export interface HubSpotFormConfig {
  portalId: string;
  formId: string;
  target: string;
}

export interface HubSpotForms {
  create: (config: HubSpotFormConfig) => void;
}

// windowのグローバル型を拡張
declare global {
  interface Window {
    hbspt?: {
      forms: HubSpotForms;
    };
  }
}
