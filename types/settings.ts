export type SettingItem = {
  name: string;
  description?: string;
  type: string;
  key: string;
  value?: any;
  action?: () => void;
};
